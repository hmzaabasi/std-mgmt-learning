import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    createDepartment,
    updateDepartment
} from "../../services/departmentService";
import { toast } from "react-toastify";
function DepartmentModal({ show, onClose, onSuccess, department }) {
    const [name, setName] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: ""
        }
    })
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        

        if (department) {
            setValue("name", department.name)
        } else {
            reset()
        }
    }, [department, setValue, reset]);

        const handleSave = async (data) => {
    setSaving(true);

    try {

        if (department) {

            await updateDepartment(department.id, {
                id: department.id,
                name: data.name
            });

            onSuccess("Department updated successfully.");

        } else {

            await createDepartment({
                name: data.name
            });

            onSuccess("Department created successfully.");
        }

        reset();
        onClose();

    } catch (error) {

        console.error(error);
        toast.error("Failed to save department.")

    } finally {

        setSaving(false);

    }
}


    const handleClose = () =>{
        reset()
        onClose()
    }



    if (!show) {
        return null;
    }

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            {department ? "Edit Department" : "Add Department"}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">
                                Department Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter department name"
                                {...register("name", {
                                    required: "Department name is required."
                                })}
                            />
                            {errors.name && (
                                <div className="text-danger mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={handleClose}
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
                                : department
                                    ? "Update"
                                    : "Save"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DepartmentModal;