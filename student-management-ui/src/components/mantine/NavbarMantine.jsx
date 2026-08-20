import { NavLink, useLocation } from "react-router-dom"
import {
    AppShell,
    Group,
    Title,
    Button,
    Divider,
    ActionIcon,
    Tooltip
} from "@mantine/core"

import { useUI } from "../../context/UIContext"
import { useState } from "react"
import ConfirmSwitchModalMantine from "./ConfirmSwitchModalMantine"
import { IconSwitchVertical, IconLogout } from "@tabler/icons-react"
import logo from "../../assets/SMS_logo.png"

function NavbarMantine() {

    const { framework, toggleFramework } = useUI()
    const [showSwitchModal, setShowSwitchModal] = useState(false)
    const location = useLocation()

    return (
        <>
            <AppShell.Header
                px="xl"
                style={{
                    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)"
                }}
            >
                <Group h="100%" justify="space-between">

                    <Group gap="sm">
                        <img src={logo} alt="logo" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
                        <Title
                            order={4}
                            style={{
                                color: "white",
                                letterSpacing: "0.3px",
                                fontWeight: 600
                            }}
                        >
                            Student Management System
                        </Title>
                    </Group>

                    <Group gap="xs">

                        <Button
                            component={NavLink}
                            to="/departments"
                            variant="subtle"
                            radius="md"
                            style={{
                                color: location.pathname === "/departments" ? "white" : "rgba(255,255,255,0.95)",
                                fontWeight: location.pathname === "/departments" ? 600 : 400,
                                borderBottom: location.pathname === "/departments" ? "2px solid white" : "2px solid transparent",
                                borderRadius: 0,
                                padding: "6px 12px"
                            }}
                        >
                            Departments
                        </Button>

                        <Button
                            component={NavLink}
                            to="/students"
                            variant="subtle"
                            radius="md"
                            style={{
                                color: location.pathname === "/students" ? "white" : "rgba(255,255,255,0.95)",
                                fontWeight: location.pathname === "/students" ? 600 : 400,
                                borderBottom: location.pathname === "/students" ? "2px solid white" : "2px solid transparent",
                                borderRadius: 0,
                                padding: "6px 12px"
                            }}
                        >
                            Students
                        </Button>

                        <Divider orientation="vertical" color="rgba(255,255,255,0.15)" />

                        <Tooltip label="Switch UI" withArrow>
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                size="lg"
                                radius="md"
                                onClick={() => setShowSwitchModal(true)}
                                style={{ color: "rgba(255,255,255,0.7)" }}
                            >
                                <IconSwitchVertical size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Logout" withArrow>
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                size="lg"
                                radius="md"
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    window.location.href = "/login"
                                }}
                                style={{ color: "rgba(255,255,255,0.7)" }}
                            >
                                <IconLogout size={18} />
                            </ActionIcon>
                        </Tooltip>

                    </Group>

                </Group>

            </AppShell.Header>

            <ConfirmSwitchModalMantine
                show={showSwitchModal}
                framework={framework}
                onCancel={() => setShowSwitchModal(false)}
                onConfirm={() => {
                    toggleFramework()
                    setShowSwitchModal(false)
                }}
            />
        </>
    )

}

export default NavbarMantine