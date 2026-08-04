import { Routes, Route, Navigate } from "react-router-dom";

import { useUI } from "./context/UIContext";

import BootstrapLayout from "./layouts/BootstrapLayout";
import MantineLayout from "./layouts/MantineLayout";

import DepartmentList from "./pages/Bootstrap/Departments/DepartmentList";
import StudentList from "./pages/Bootstrap/Students/StudentList";

import DepartmentListMantine from "./pages/Mantine/Department/DepartmentListMantine";
import StudentListMantine from "./pages/Mantine/Student/StudentListMantine";

function App() {

    const { framework } = useUI();

    const Layout =
        framework === "bootstrap"
            ? BootstrapLayout
            : MantineLayout;

    return (

        <Routes>

            <Route
                element={<Layout />}
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

    );

}

export default App;