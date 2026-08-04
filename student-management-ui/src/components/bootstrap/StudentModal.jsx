import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getDepartments } from "../../services/departmentService";
import {
    createStudent,
    updateStudent
} from "../../services/studentService";
import { toast } from "react-toastify";

function StudentModal({
    show,
    student,
    onClose,
    onSuccess
}) {

   
    const [departments, setDepartments]= useState([])
    const [saving, setSaving] = useState(false);

    const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
} = useForm({
    defaultValues: {
        name: "",
        email: "",
        age: "",
        departmentId: ""
    }
})

    const handleSave = async (data) => {

    setSaving(true);

    try {

        if (student) {

            await updateStudent(student.id, {
                id: student.id,
                ...data
            });

            onSuccess("Student updated successfully.");

        } else {

            await createStudent(data);

            onSuccess("Student created successfully.");
        }

        reset();
        onClose();

    } catch (error) {

        console.error(error);
        toast.error("Failed to save student.");

    } finally {

        setSaving(false);

    }

}

    const loadDepartments = async () => {

        try {

            const response = await getDepartments(1, 100);

            setDepartments(response.data.items);

        }
         catch (error) {

             console.error(error);

          }

        }


    useEffect(() => {

    if (student) {

        setValue("name", student.name);
        setValue("email", student.email);
        setValue("age", student.age);
        setValue("departmentId", student.departmentId);

    } else {

        reset();

    }

}, [student, setValue, reset])

    useEffect(() => {

        void loadDepartments();

    }, []);


    if (!show) {
        return null;
    }

    return (

        <div className="modal d-block" tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            {student ? "Edit Student" : "Add Student"}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                   <div className="modal-body">

                        <div className="mb-3">
                            <label className="form-label">
                                Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                {...register("name", {
                                    required: "Name is required."
                                })}
                            />

                            {errors.name && (
                                <div className="text-danger mt-1">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                {...register("email", {
                                    required: "Email is required.",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email."
                                    }
                                })}
                            />

                            {errors.email && (
                                <div className="text-danger mt-1">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Age
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                {...register("age", {
                                    required: "Age is required.",
                                    min: {
                                        value: 1,
                                        message: "Age must be greater than zero."
                                    },
                                    valueAsNumber: true
                                })}
                            />

                            {errors.age && (
                                <div className="text-danger mt-1">
                                    {errors.age.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Department
                            </label>

                            <select
                                className="form-select"
                                {...register("departmentId", {
                                    required: "Please select a department.",
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">
                                    Select Department
                                </option>

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && (
                                <div className="text-danger mt-1">
                                    {errors.departmentId.message}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit(handleSave)}
                            disabled={saving}
                        >
                            {saving
                                    ? "Saving..."
                                    : student
                                        ? "Update"
                                        : "Save"}
                            
                        </button>

                    </div>

                </div>

            </div>

        </div>
        

    );
}

export default StudentModal;