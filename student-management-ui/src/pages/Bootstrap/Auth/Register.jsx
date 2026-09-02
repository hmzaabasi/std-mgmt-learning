import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/axios"

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("Student")
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
            const response = await api.post("/auth/register", { username, password, role })
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
                    <p className="text-muted">Create a new account</p>
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

                <div className="mb-3">
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

                <div className="mb-4">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-semibold">Role</label>
                    <select
                        className="form-select form-select-lg"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <button
                    className="btn btn-primary btn-lg w-100 mb-3"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Creating account...
                        </>
                    ) : "Register"}
                </button>

                <p className="text-center text-muted mb-0">
                    Already have an account?{" "}
                    <span
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </span>
                </p>

            </div>
        </div>
    )

}

export default Register