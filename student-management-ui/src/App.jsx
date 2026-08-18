import { Routes, Route, Navigate } from "react-router-dom"

import { useUI } from "./context/UIContext"

import BootstrapLayout from "./layouts/BootstrapLayout"
import MantineLayout from "./layouts/MantineLayout"

import DepartmentList from "./pages/Bootstrap/Departments/DepartmentList"
import StudentList from "./pages/Bootstrap/Students/StudentList"

import DepartmentListMantine from "./pages/Mantine/Department/DepartmentListMantine"
import StudentListMantine from "./pages/Mantine/Student/StudentListMantine"

import Login from "./pages/Bootstrap/Auth/Login"
import LoginMantine from "./pages/Mantine/Auth/LoginMantine"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

    const { framework } = useUI()

    const Layout =
        framework === "bootstrap"
            ? BootstrapLayout
            : MantineLayout

    return (

        <Routes>

            <Route
                path="/login"
                element={
                    framework === "bootstrap"
                        ? <Login />
                        : <LoginMantine />
                }
            />

            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/departments"
                            replace
                        />
                    }
                />

                <Route
                    path="/departments"
                    element={
                        framework === "bootstrap"
                            ? <DepartmentList />
                            : <DepartmentListMantine />
                    }
                />

                <Route
                    path="/students"
                    element={
                        framework === "bootstrap"
                            ? <StudentList />
                            : <StudentListMantine />
                    }
                />

            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to="/departments"
                        replace
                    />
                }
            />

        </Routes>

    )

}

export default App