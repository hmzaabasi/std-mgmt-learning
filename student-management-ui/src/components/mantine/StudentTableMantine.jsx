import { Table, Button, Text, Group, Center, Loader, Stack} from "@mantine/core";
import { IconEdit, IconTrash, IconUserX } from "@tabler/icons-react";
import { Tab } from "bootstrap";


function StudentTable({
    loading,
    students,
    onEdit,
    onDelete
}) {

    if (loading) {
    
        return (
    
            <Center h={300}>
                <Loader size="lg" />
            </Center>
    
        )
    
    }

    return (

        <Table
    striped
    highlightOnHover
    withTableBorder
    withColumnBorders
    verticalSpacing="sm"
    horizontalSpacing="md"
>
            <Table.Thead bg="gray.3">

                <Table.Tr>

                    <Table.Th 
                        w={70}
                        style={{
                        textAlign: "center",
                        fontSize:"16px",

                    }}>
                        ID
                    </Table.Th>

                    <Table.Th 
                        w={180}
                        style={{
                        textAlign: "center",
                        fontSize:"16px",

                    }}>
                        Name
                    </Table.Th>

                    <Table.Th 
                        w={220}
                        style={{
                        textAlign: "center",
                        fontSize:"16px",
                    }}>
                        Email
                    </Table.Th>

                    <Table.Th 
                        w={70}
                        style={{
                        textAlign: "center",
                        fontSize:"16px",

                    }}>
                        Age
                    </Table.Th>

                    <Table.Th 
                        w={220}
                        style={{
                        textAlign: "center",
                        fontSize:"16px",
                    }}>
                        Department
                    </Table.Th>

                    <Table.Th 
                        w={200}
                        style={{
                        textAlign: "center",
                        fontSize:"16px",
                        

                    }}>
                        Actions
                    </Table.Th>

                </Table.Tr>

            </Table.Thead>

            <Table.Tbody>

                {students.length > 0 ? (

                    students.map(student => (

                        <Table.Tr key={student.id}>

                            <Table.Td style={{textAlign:"center", fontSize:"16px"}}>
                                {student.id}
                            </Table.Td>

                            <Table.Td style={{textAlign:"center", fontSize:"16px"}}>
                                {student.name}
                            </Table.Td>

                            <Table.Td style={{textAlign:"center", fontSize:"16px"}}>
                                {student.email}
                            </Table.Td>

                            <Table.Td style={{textAlign:"center", fontSize:"16px"}}>
                                {student.age}
                            </Table.Td>

                            <Table.Td style={{textAlign:"center", fontSize:"16px"}}>
                                {student.departmentName || "-"}
                            </Table.Td>

                            <Table.Td>

                                <Group
                                    justify="center"
                                    gap="xs"
                                >

                                    <Button
                                            size="xs"
                                            variant="light"
                                            radius="md"
                                            onClick={()=> onEdit(student)}
                                           
                                        >
                                            <IconEdit size={16}/>
                                        </Button>

                                        <Button
                                            color="red"
                                            size="xs"
                                            variant="light"
                                            radius="md"
                                            onClick={()=> onDelete(student)}
                                        >
                                            <IconTrash size={16}/>
                                        </Button>

                                </Group>

                            </Table.Td>

                        </Table.Tr>

                    ))

                ) : (

                    <Table.Tr>

                        <Table.Td colSpan={6}>
                            <Center py="xl">
                                <Stack align="center">
                                    <IconUserX size={48} />

                                    <Text fw={500}>
                                        No students found.
                                    </Text>

                                    <Text c="dimmed" size="sm">
                                        Click <strong>Add Student</strong> to create one.
                                    </Text>
                                </Stack>
                            </Center>
                        </Table.Td>
                    </Table.Tr>

                )}

            </Table.Tbody>

        </Table>

    );

}

export default StudentTable;