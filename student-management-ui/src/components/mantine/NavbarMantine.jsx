import { NavLink, useLocation } from "react-router-dom";
import {
    AppShell,
    Group,
    Title,
    Button
} from "@mantine/core";

import { useUI } from "../../context/UIContext";
import { useState } from "react";
import ConfirmSwitchModalMantine from "./ConfirmSwitchModalMantine";
import { IconSchool, IconSwitchVertical } from "@tabler/icons-react";

function NavbarMantine() {

    const { framework, toggleFramework } = useUI();
    const [showSwitchModal, setShowSwitchModal] = useState(false);
    const location=useLocation()

    return (
        <>

        <AppShell.Header px="xl"
            bg="teal.5"
            style={{
                        borderBottom: "1px solid var(--mantine-color-gray-3)"
                    }}
        >

            <Group
                h="100%"
                justify="space-between"
            >
                <Group gap="xs">

                    <IconSchool size={28} color="white"/>

                <Title 
                    order={3}
                    c="dark"
                >
                    Student Management System
                </Title>

                </Group>

                <Group gap="sm">

                    <Button
                        component={NavLink}
                        to="/departments"
                        variant={location.pathname === "/departments" ? "white" : "subtle"}
                        color={location.pathname === "/departments" ? "dark":"white"}
                        radius="md"
                        styles={{
                            label:{
                                fontSize:"16px",
                                fontWeight:"bold"
                            }
                        }
                            
                        }
                    >
                        Departments
                    </Button>

                    <Button
                        component={NavLink}
                        to="/students"
                        variant={location.pathname === "/students" ? "white" : "subtle"}
                        color={location.pathname === "/students" ? "dark":"white"}
                        radius="md"
                        styles={{
                            label:{
                                fontSize:"16px",
                                fontWeight:"bold"
                            }
                        }
                            
                        }
                    >
                        Students
                    </Button>

                    <Button
                        variant="filled"
                        color="dark"
                        radius="xl"
                        leftSection= {<IconSwitchVertical size={18}/>}
                        onClick={() => setShowSwitchModal(true)}
                    >
                            Switch UI
                    </Button>

                    <Button
                        variant="filled"
                        color="red"
                        radius="xl"
                        onClick={() => {
                            localStorage.removeItem("token")
                            window.location.href = "/login"
                        }}
                    >
                        Logout
                    </Button>

                </Group>

            </Group>

        </AppShell.Header>

        <ConfirmSwitchModalMantine
                show={showSwitchModal}
                framework={framework}
                onCancel={() => setShowSwitchModal(false)}
                onConfirm={() => {
                    toggleFramework();
                    setShowSwitchModal(false);
                }}
            />

        </>
        

    );

}

export default NavbarMantine;