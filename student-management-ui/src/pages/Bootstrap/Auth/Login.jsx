import { useState } from "react"
import api from "../../../api/axios"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setError("")

        if (!username || !password) {
            setError("Please enter username and password")
            return
        }

        setLoading(true)

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
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f0f2f5" }}
        >
            <div
                className="card shadow-lg p-4"
                style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}
            >
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Student Management</h2>
                    <p className="text-muted">Sign in to your account</p>
                </div>

                {error && (
                    <div className="alert alert-danger py-2 text-center">
                        {error}
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <button
                    className="btn btn-primary btn-lg w-100"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Signing in...
                        </>
                    ) : "Sign In"}
                </button>
            </div>
        </div>
    )

}

export default Login