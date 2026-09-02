import { useState } from "react"
import { TextInput, PasswordInput, Button, Paper, Title, Text, Alert, Grid, Flex, Box } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/axios"
import logo from "../../../assets/SMS_logo.png"

function LoginMantine() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

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
    <Flex
        h="100vh"
        align="center"
        justify="center"
        style={{
           background: "#f0f2f5"
        }}
    >
        <Paper
            radius="xl"
            shadow="xl"
            style={{ 
                width: "900px", 
                maxWidth: "95vw", 
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.1)"
            }}
        >
            <Grid m={0}>
                <Grid.Col span={6}
                    style={{ 
                        minHeight: "500px",
                        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" 
                    }}>
                        <Flex direction="column"
                            justify="center" 
                            align="center" 
                            h="100%" p="xl"
                            >
                                <img src={logo} alt="logo" style={{width: "120px" , marginBottom: "24px"}}/>
                                <Title order={2} c="white" ta="center" mb="xl">
                                    Welcome Back!
                                </Title>
                                <Text c="rgba(255,255,255,0.7)" ta="center" size="sm">
                                    Sign in to manage your students and departments
                                </Text>
                            </Flex>
                </Grid.Col>
                <Grid.Col span={6}
                    style={{ 
                        minHeight: "500px",
                        background: "white" 
                    }}>
                    <Flex direction="column"
                            justify="center" 
                            align="center" 
                            h="100%" p="xl"
                    >
                        <Box>
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
                                <Text ta="center" size="sm" c="dimmed" mt="md">
                                    Don't have an account?{" "}
                                    <span
                                        style={{ color: "var(--mantine-color-blue-6)", cursor: "pointer" }}
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </span>
                                </Text>
                            </Box>
                        </Flex>  
                </Grid.Col>
            </Grid>
        </Paper>
    </Flex>
)

}

export default LoginMantine