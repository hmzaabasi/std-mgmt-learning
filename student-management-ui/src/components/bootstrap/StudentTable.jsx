function StudentTable({
    students,
    onEdit,
    onDelete
}) {

    return (

        <table className="table table-bordered table-hover">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th className="text-center">
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {students.length > 0 ? (

                    students.map(student => (

                        <tr key={student.id}>

                            <td>{student.id}</td>

                            <td>{student.name}</td>

                            <td>{student.email}</td>

                            <td>{student.age}</td>

                            <td>{student.departmentName || "-"}</td>

                            <td>

                                <button
                                    type="button"
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => onEdit(student)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(student)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td
                            colSpan="6"
                            className="text-center"
                        >
                            No students found.
                            <br />
                            Click <strong>Add Student</strong> to create one.
                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    );

}

export default StudentTable;