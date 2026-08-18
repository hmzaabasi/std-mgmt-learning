import { useState } from "react"
import { TextInput, PasswordInput, Button, Paper, Title, Text, Alert } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import api from "../../../api/axios"

function LoginMantine() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        setError("")

        if (!username || !password) {
            setError("Please enter username and password")
            setLoading(false)
            return
        }

        try {
            const response = await api.post("/auth/login", { username, password })
            localStorage.setItem("token", response.data.token)
            window.location.href = "/departments"
        } catch (err) {
            setError("Invalid username or password")
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin()
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f2f5"
            }}
        >
            <Paper
                shadow="lg"
                radius="md"
                p="xl"
                style={{ width: "100%", maxWidth: "420px" }}
            >
                <Title order={2} ta="center" mb={4}>
                    Student Management
                </Title>

                <Text c="dimmed" size="sm" ta="center" mb="lg">
                    Sign in to your account
                </Text>

                {error && (
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        color="red"
                        mb="md"
                        radius="md"
                    >
                        {error}
                    </Alert>
                )}

                <TextInput
                    label="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    size="md"
                    mb="md"
                />

                <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    size="md"
                    mb="xl"
                />

                <Button
                    fullWidth
                    size="md"
                    loading={loading}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>

            </Paper>
        </div>
    )

}

export default LoginMantine