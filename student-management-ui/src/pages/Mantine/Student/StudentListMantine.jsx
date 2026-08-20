import { useEffect, useState } from "react"
import {
    getStudents,
    deleteStudent
} from "../../../services/studentService"

import {
    Container,
    Card,
    Group,
    Button,
    Title,
    Text,
    TextInput,
    Loader,
    Center,
    Pagination,
    Select
} from "@mantine/core"

import {
    IconPlus,
    IconSearch,
    IconCheck
} from "@tabler/icons-react"

import StudentTableMantine from "../../../components/mantine/StudentTableMantine";
import StudentModalMantine from "../../../components/mantine/StudentModalMantine";
import ConfirmDeleteModalMantine from "../../../components/mantine/ConfirmDeleteModalMantine";

import { notifications } from "@mantine/notifications";

function StudentList() {

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showDeleteModal, setShowDeleteModal]= useState(false)
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const pageSize = 5;
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        loadStudents();
    }, [page, search, sortBy, sortOrder]);

    const loadStudents = async () => {
        if(loading){
            setLoading(true)
        }
        else{
            setSearching(true)
        }

        try {

            const response = await getStudents(
                page,
                pageSize,
                search,
                sortBy,
                sortOrder
            )

            setStudents(response.data.items)
            setTotalPages(response.data.totalPages)

        }
        catch (error) {

            console.error(error);
            notifications.show({
                title: "Error",
                message:"Failed to load students",
                color:"red",
                position:"top-left",
                icon: <IconCheck size={18}/>
            })

        }
        finally{
            setLoading(false)
            setSearching(false)
        }
    }

     const handleDelete = async () => {

        if(!selectedStudent)
            return

        try {

            await deleteStudent(selectedStudent.id)

            setShowDeleteModal(false)

            setSelectedStudent(null)

            await new Promise(resolve => setTimeout(resolve, 500))
            await loadStudents()

            notifications.show({
                title: "Success",
                message:"Student deleted successfully",
                color:"green",
                position:"top-left",
                icon: <IconCheck size={18}/>
            })

        }
        catch (error) {

            console.error(error)
            notifications.show({
                title: "Error",
                message:"Failed to delete student",
                color:"red",
                position:"top-left",
                icon: <IconCheck size={18}/>
            })

        }

    }

    const handleEditClick = (student) => {

    setSelectedStudent(student)

    setShowModal(true)

    }

    const handleDeleteClick = (student) => {

        setSelectedStudent(student);

        setShowDeleteModal(true);

    }
    


    return (

     <Container size="95%" mt="xl">

    <Card
        shadow="md"
        withBorder
        padding="xl"
        radius="lg"
    >
    <Group
    justify="space-between"
    align="center"
    mb="lg"
>

    <div>

        <Title order={2}>
            Student Management
        </Title>

        <Text c="dimmed">
            Manage all students in the system.
        </Text>

    </div>

    <Button
            variant="filled"
            px="xl"
            leftSection={<IconPlus size={16} />}
            size="md"
            radius="md"
            onClick={() => {

                setSelectedStudent(null)
                setShowModal(true)
                }}
    >
                Add Student
    </Button>

</Group>
           
        

                 <Group
    justify="space-between"
    align="end"
    mb="lg"
>

    <TextInput
        style={{ flex: 1 }}
        mr="xl"
        label="Search"
        placeholder="Search students by name..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => {

            setSearch(e.target.value)
            setPage(1)

        }}
    />

    <Group gap="md">

        <Select
            w={180}
            label="Sort By"
            value={sortBy}
            onChange={(value) => {

                setSortBy(value)
                setPage(1)

            }}
            data={[
                { value: "id", label: "ID" },
                { value: "name", label: "Name" },
                { value: "email", label: "Email" },
                { value: "age", label: "Age" },
                { value: "department", label: "Department" }
            ]}
        />

        <Select
            w={180}
            label="Order"
            value={sortOrder}
            onChange={(value) => {

                setSortOrder(value)
                setPage(1)

            }}
            data={[
                { value: "asc", label: "Ascending" },
                { value: "desc", label: "Descending" }
            ]}
        />

    </Group>

</Group>

            <StudentTableMantine
                loading={loading}
                students={students}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
                <StudentModalMantine
                    show={showModal}
                    student={selectedStudent}
                    onClose={() => {
                        setShowModal(false)
                        setSelectedStudent(null)
                    }}
                    onSuccess={async (msg) => {
                       notifications.show({
                        title: "Success",
                        message:msg,
                        color:"green",
                        position:"top-left",
                        icon: <IconCheck size={18}/>
                    })
                       await new Promise(resolve => setTimeout(resolve, 500))
                       await loadStudents()

                    }}
                />

                                <ConfirmDeleteModalMantine
                    show={showDeleteModal}
                    title="Delete Student"
                    message={`Are you sure you want to delete "${selectedStudent?.name}"?`}
                    onCancel={() => {
                        setShowDeleteModal(false)
                        setSelectedStudent(null)
                    }}
                    onConfirm={handleDelete}
                />
                <Group
                    justify="center"
                    mt="xl"
                >

                    <Pagination
                        value={page}
                        onChange={setPage}
                        total={totalPages}
                    />

                </Group>
                </Card>

             </Container>

    )

}

export default StudentList