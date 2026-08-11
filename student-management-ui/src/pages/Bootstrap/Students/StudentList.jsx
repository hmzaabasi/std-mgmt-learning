import { useEffect, useState } from "react";
import StudentTable from "../../../components/bootstrap/StudentTable";
import { getStudents, deleteStudent } from "../../../services/studentService";
import StudentModal
 from "../../../components/bootstrap/StudentModal";
 import ConfirmDeleteModal from "../../../components/bootstrap/ConfirmDeleteModal";
 import { toast } from "react-toastify";


function StudentList() {

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showDeleteModal, setShowDeleteModal]= useState(false)
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false)
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        loadStudents();
    }, [page, search, sortBy, sortOrder]);

    const loadStudents = async () => {
        if(loading){
            setLoading(true)
        }
        else{
            setSearching(true)
        }

        try {

            const response = await getStudents(
                page,
                pageSize,
                search,
                sortBy,
                sortOrder
            )

            setStudents(response.data.items)
            setTotalPages(response.data.totalPages)

        }
        catch (error) {

            console.error(error);
            toast.error("Failed to load students.")

        }
        finally{
            setLoading(false)
            setSearching(false)
        }
    }

     const handleDelete = async () => {

        if(!selectedStudent)
            return

        try {

            await deleteStudent(selectedStudent.id)

            setShowDeleteModal(false)

            setSelectedStudent(null)

            await new Promise(resolve => setTimeout(resolve, 500))
            await loadStudents()

            toast.success("Student deleted successfully.")

        }
        catch (error) {

            console.error(error)
            toast.error("Failed to delete student.")

        }

    }

    const handleEditClick = (student) => {

    setSelectedStudent(student)

    setShowModal(true)

    }

    const handleDeleteClick = (student) => {

        setSelectedStudent(student);

        setShowDeleteModal(true);

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
            Student Management
        </h2>

        <p className="text-muted mb-0">
            Manage all students in the system.
        </p>

        </div>

             <button
                className="btn btn-success"
                onClick={() => {
                    setSelectedStudent(null)
                    setShowModal(true)
                }}
            >
                + Add Student
            </button>

           
        </div>

                 <div className="row mb-3">

    <div className="col-md-6">
        <input
            type="text"
            className="form-control"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(
                e.target.value,
                setPage(1)
            )}
        />
    </div>

    <div className="col-md-3">
        <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
            }}
        >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="age">Sort by Age</option>
            <option value="department">Sort by Department</option>
        </select>
    </div>

    <div className="col-md-3">
        <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
            }}
        >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div>

</div>

            <StudentTable
                students={students}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
                <StudentModal
                    show={showModal}
                    student={selectedStudent}
                    onClose={() => {
                        setShowModal(false)
                        setSelectedStudent(null)
                    }}
                    onSuccess={async (msg) => {
                       toast.success(msg)
                       
                       await new Promise(resolve => setTimeout(resolve, 500))
                       await loadStudents()

                    }}
                />

                                <ConfirmDeleteModal
                    show={showDeleteModal}
                    title="Delete Student"
                    message={`Are you sure you want to delete "${selectedStudent?.name}"?`}
                    onCancel={() => {
                        setShowDeleteModal(false)
                        setSelectedStudent(null)
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
                        disabled={page===totalPages}
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

export default StudentList