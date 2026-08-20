import { useEffect, useState } from "react"
import {
    getDepartments,
    deleteDepartment
} from "../../../services/departmentService"
import DepartmentTableMantine from "../../../components/mantine/DepartmentTableMantine";
import DepartmentModalMantine from "../../../components/mantine/DepartmentModalMantine";
import ConfirmDeleteModalMantine from "../../../components/mantine/ConfirmDeleteModalMantine";

import { IconPlus, IconSearch, IconCheck } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications";
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
    Select,
    Pagination
} from "@mantine/core"

function DepartmentList() {

    const [departments, setDepartments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortBy, setSortBy] = useState("id")
    const [sortOrder, setSortOrder] = useState("asc")

    const [page, setPage] = useState(1)
    const pageSize = 5
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        void loadDepartments()
    }, [page, debouncedSearch, sortBy, sortOrder])

    useEffect(() => {

    const timer = setTimeout(() => {

        setDebouncedSearch(search);
        setPage(1);

    }, 400);

    return () => clearTimeout(timer);

}, [search]);

    const loadDepartments = async () => {

         if (loading) {
            setLoading(true);
        } 
        else {
            setSearching(true);
        }
       
        try {

            const response = await getDepartments(
                page,
                pageSize,
                debouncedSearch,
                sortBy,
                sortOrder
            )

            setDepartments(response.data.items)
            setTotalPages(response.data.totalPages)

        }
        catch (error) {

            console.error("Error loading departments:", error)
            notifications.show({
                title: "Error",
                message:"Failed to load departments",
                color:"red",
                position:"top-left",
                icon: <IconCheck size={18}/>
            })

        }
        finally {

            setLoading(false)
            setSearching(false)
           
        }

    }

    const handleDelete = async () => {

        if (!selectedDepartment)
            return

        try {

            await deleteDepartment(selectedDepartment.id)

            setSelectedDepartment(null)
            setShowDeleteModal(false)

            await new Promise(resolve => setTimeout(resolve, 500))
            await loadDepartments()

            notifications.show({
                title:"Success",
                message:"Department deleted successfully.",
                color:"red",
                position:"top-left",
                icon: <IconCheck size={18}/>
            })

        }
        catch (error) {

            console.error("Error deleting department:", error)
            notifications.show({
                title: "Error",
                message:"Failed to delete department",
                color:"red",
                position:"top-left",
                icon: <IconCheck size={18}/>
            }
            )
        }

    }

    const handleEditClick = (department) => {

        setSelectedDepartment(department)
        setShowModal(true)

    }

    const handleDeleteClick = (department) => {

        setSelectedDepartment(department)
        setShowDeleteModal(true)

    }


    

    return (

        <Container size="xl" mt="xl">

            <Card
            shadow="md"
            withBorder
            padding="xl"
            radius="lg"
            >
                    <Group
                    justify="space-between"
                    align="center"
                    mb="lg">

                        <div>

                            <Title order={2}>
                                Department Management
                            </Title>

                            <Text c="dimmed">
                                Manage all departments in the system.
                            </Text>

                        </div>

                        <Button
                            variant="filled"
                            leftSection={<IconPlus size={18} />}
                            size="md"
                            radius="md"
                            onClick={() => {

                                setSelectedDepartment(null)
                                setShowModal(true)

                            }}
                        >
                            Add Department
                        </Button>

                    </Group>

                    <Group
                        justify="space-between"
                        align="end"
                        mb="lg"
                    >

                    <TextInput
                        style={{flex: 1}}
                        mr="xl"
                        label="Search"
                        placeholder="Search by department name..."
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }

                        }
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
                                { value: "name", label: "Name" }
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

                    <DepartmentTableMantine
                        loading={loading}
                        departments={departments}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />

                    <DepartmentModalMantine
                        show={showModal}
                        department={selectedDepartment}
                        onClose={() => {

                            setShowModal(false)
                            setSelectedDepartment(null)

                        }}
                        onSuccess={async (msg) => {

                            notifications.show({
                                title:"Success",
                                message:msg,
                                color:"green",
                                position:"top-left",
                                icon: <IconCheck size={18}/>
                            })
                            await new Promise(resolve => setTimeout(resolve, 500))
                            await loadDepartments()

                        }}
                    />

                    <ConfirmDeleteModalMantine
                        show={showDeleteModal}
                        title="Delete Department"
                        message={`Are you sure you want to delete "${selectedDepartment?.name}"?`}
                        onCancel={() => {

                            setShowDeleteModal(false)
                            setSelectedDepartment(null)

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
                        mt="md"
                        />
                    </Group>
            </Card>

        </Container>

    )

}

export default DepartmentList

