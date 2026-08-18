import { NavLink, useLocation } from "react-router-dom";
import { useUI } from "../../context/UIContext";
import { useState } from "react";
import ConfirmSwitchModal from "./ConfirmSwitchModal";
function Navbar() {

    const {framework, toggleFramework } = useUI();
    const [showSwitchModal, setShowSwitchModal] = useState(false);

    const location = useLocation();

   return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <NavLink
                    to="/students"
                    className="navbar-brand"
                >
                    Student Management System
                </NavLink>

                <div className="d-flex align-items-center">

                    <div className="navbar-nav me-3">

                        <NavLink
                            to="/departments"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active fw-bold"
                                    : "nav-link"
                            }
                        >
                            Departments
                        </NavLink>

                        <NavLink
                            to="/students"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active fw-bold"
                                    : "nav-link"
                            }
                        >
                            Students
                        </NavLink>

                    </div>

                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setShowSwitchModal(true)}
                    >
                        Switch UI
                    </button>

                    <button
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => {
                            localStorage.removeItem("token")
                            window.location.href = "/login"
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

        <ConfirmSwitchModal
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

export default Navbar;