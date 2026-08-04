import { Table, Button, Text, Group,  Center, Loader, Stack } from "@mantine/core";
import { IconEdit, IconTrash, IconDatabaseOff } from "@tabler/icons-react";

function DepartmentTable({
    loading,
    departments,
    onEdit,
    onDelete
}) {

    if (loading) {

        return (

            <Center h={300}>
                <Loader size="lg"/>
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

            <Table.Thead >
                <Table.Tr>

                    <Table.Th style={{
                        textAlign: "center",
                        fontSize:"16px",
                        width: "120px"

                    }}>ID</Table.Th>

                    <Table.Th style={{
                        textAlign: "center",
                        fontSize: "16px"
                        }}>Name</Table.Th>

                    <Table.Th style={{
                         textAlign: "center", 
                         fontSize:"16px",
                         width: "300px"
                         }}>
                        Actions
                    </Table.Th>

                </Table.Tr>

            </Table.Thead>

            <Table.Tbody>

                {departments.length > 0 ? (

                    departments.map(department => (

                        <Table.Tr key={department.id}>

                            <Table.Td
                                style={{ textAlign: "center", fontSize: "16px" }}
                            >{department.id}</Table.Td>

                            <Table.Td
                                style={{ textAlign: "center", fontSize: "16px" }}
                            >{department.name}</Table.Td>

                           <Table.Td
                                style={{ textAlign: "center" }}
                            >
                                <Group
                                    justify="center"
                                    gap="xs"
                                >
                                    <Button
                                        size="xs"
                                        radius="md"
                                        variant="light"
                                        onClick={() => onEdit(department)}
                                    >
                                       <IconEdit size={14}/>
                                    </Button>

                                    <Button
                                        color="red"
                                        size="xs"
                                        radius="md"
                                        variant="light"
                                        onClick={() => onDelete(department)}
                                    >
                                        <IconTrash size={14}/>
                                    </Button>
                                </Group>

                            </Table.Td>

                        </Table.Tr>

                    ))

                ) : (

                    <Table.Tr>

                        <Table.Td
                           colSpan={3}
                        >
                            <Center py="xl">
                                <Stack align="center">
                                    <IconDatabaseOff size={48} />
                                    <Text>No departments found.</Text>
                                </Stack>
                            </Center>
                        </Table.Td>

                    </Table.Tr>

                )}

            </Table.Tbody>

        </Table>

    );

}

export default DepartmentTable;