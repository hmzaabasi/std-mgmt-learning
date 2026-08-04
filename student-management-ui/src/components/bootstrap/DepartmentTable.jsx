function DepartmentTable({
    departments,
    onEdit,
    onDelete
}) {

    return (

        <table className="table table-bordered table-hover">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th className="text-center">
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {departments.length > 0 ? (

                    departments.map(department => (

                        <tr key={department.id}>

                            <td>{department.id}</td>

                            <td>{department.name}</td>

                            <td>

                                <button
                                    type="button"
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => onEdit(department)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(department)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td
                            colSpan="3"
                            className="text-center"
                        >
                            No departments found.
                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    );

}

export default DepartmentTable;