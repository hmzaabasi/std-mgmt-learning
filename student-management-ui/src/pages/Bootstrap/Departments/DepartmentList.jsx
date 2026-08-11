import { useEffect, useState } from "react"
import DepartmentTable from "../../../components/bootstrap/DepartmentTable"
import {
    getDepartments,
    deleteDepartment
} from "../../../services/departmentService"
import DepartmentModal from "../../../components/bootstrap/DepartmentModal"
import ConfirmDeleteModal from "../../../components/bootstrap/ConfirmDeleteModal"
import { toast } from "react-toastify"

function DepartmentList() {

    const [departments, setDepartments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("id")
    const [sortOrder, setSortOrder] = useState("asc")

    const [page, setPage] = useState(1)
    const pageSize = 5
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        void loadDepartments()
    }, [page, search, sortBy, sortOrder])

    const loadDepartments = async () => {

        if(loading){
            setLoading(true)
        }
        else{
            setSearching(true)
        }

        try {

            const response = await getDepartments(
                page,
                pageSize,
                search,
                sortBy,
                sortOrder
            )

            setDepartments(response.data.items)
            setTotalPages(response.data.totalPages)

        }
        catch (error) {

            console.error("Error loading departments:", error)
            toast.error("Failed to load departments")

        }
        finally {

            setLoading(false)
            setSearching(false)

        }

    }

    const handleDelete = async () => {

        if (!selectedDepartment)
            return

        try {

            await deleteDepartment(selectedDepartment.id)

            setSelectedDepartment(null)
            setShowDeleteModal(false)

            await new Promise(resolve => setTimeout(resolve, 500))
            await loadDepartments()

            toast.success("Department deleted successfully.")

        }
        catch (error) {

            console.error("Error deleting department:", error)
            toast.error("Failed to delete department.")

        }

    }

    const handleEditClick = (department) => {

        setSelectedDepartment(department)
        setShowModal(true)

    }

    const handleDeleteClick = (department) => {

        setSelectedDepartment(department)
        setShowDeleteModal(true)

    }


    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

            </div>

        )

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="mb-1">
                                Department Management
                            </h2>

                            <p className="text-muted mb-0">
                                Manage all departments in the system.
                            </p>

                        </div>

                        <button
                            className="btn btn-success"
                            onClick={() => {

                                setSelectedDepartment(null)
                                setShowModal(true)

                            }}
                        >
                            + Add Department
                        </button>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-6">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search departments..."
                                value={search}
                                onChange={(e) => {

                                    setSearch(e.target.value)
                                    setPage(1)

                                }}
                            />

                        </div>

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => {

                                    setSortBy(e.target.value)
                                    setPage(1)

                                }}
                            >
                                <option value="id">Sort by ID</option>
                                <option value="name">Sort by Name</option>
                            </select>

                        </div>

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={sortOrder}
                                onChange={(e) => {

                                    setSortOrder(e.target.value)
                                    setPage(1)

                                }}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>

                        </div>

                    </div>

                    <DepartmentTable
                        departments={departments}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />

                    <DepartmentModal
                        show={showModal}
                        department={selectedDepartment}
                        onClose={() => {

                            setShowModal(false)
                            setSelectedDepartment(null)

                        }}
                        onSuccess={async (msg) => {

                            toast.success(msg)
                            
                            await new Promise(resolve => setTimeout(resolve, 500))
                            await loadDepartments()

                        }}
                    />

                    <ConfirmDeleteModal
                        show={showDeleteModal}
                        title="Delete Department"
                        message={`Are you sure you want to delete "${selectedDepartment?.name}"?`}
                        onCancel={() => {

                            setShowDeleteModal(false)
                            setSelectedDepartment(null)

                        }}
                        onConfirm={handleDelete}
                    />

                    <div className="d-flex justify-content-between mt-3">

                        <button
                            className="btn btn-secondary"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>

                        <span className="align-self-center">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            className="btn btn-primary"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default DepartmentList

