import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextInput, PasswordInput, Button, Paper, Title, Text, Alert, Grid, Flex, Box } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import api from "../../../api/axios"
import logo from "../../../assets/SMS_logo.png"

function RegisterMantine() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async () => {
        setError("")

        if (!username || !password || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)

        try {
            const response = await api.post("/auth/register", { username, password })
            localStorage.setItem("token", response.data.token)
            window.location.href = "/departments"
        } catch (err) {
            setError("Username already exists")
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleRegister()
    }

    return (
        <Grid style={{ height: "100vh", margin: 0 }}>
                <Grid.Col span={6}
                    style={{ 
                        height: "100vh",
                        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" 
                    }}>
                        <Flex direction="column"
                              justify="center" 
                              align="center" 
                              h="100%" p="xl"
                            >
                                <img src={logo} alt="logo" style={{width: "120px" , marginBottom: "24px"}}/>
                                <Title order={2} c="white" ta="center" mb="xl">
                                    Join Us!
                                </Title>
                                 <Text c="rgba(255,255,255,0.7)" ta="center" size="sm">
                                    Sign up to manage your students and departments
                                </Text>
                            </Flex>
                </Grid.Col>
                <Grid.Col span={6}
                    style={{ 
                        height: "100vh",
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
                    Create a new account
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
                    mb="md"
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    size="md"
                    mb="xl"
                />

                <Button
                    fullWidth
                    size="md"
                    loading={loading}
                    onClick={handleRegister}
                    mb="md"
                >
                    Register
                </Button>

                <Text ta="center" size="sm" c="dimmed">
                    Already have an account?{" "}
                    <span
                        style={{ color: "var(--mantine-color-blue-6)", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                        </span>
                    </Text>
                 </Box>
            </Flex>  
    </Grid.Col>
</Grid>
 )

}

export default RegisterMantine