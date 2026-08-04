import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import {createDepartment,updateDepartment} 
from "../../services/departmentService"
import {Modal,TextInput,Button,Group} from "@mantine/core"
import { notifications } from "@mantine/notifications"

import { IconCheck } from "@tabler/icons-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { departmentSchema } from "../../schemas/departmentSchema"

function DepartmentModal({ show, onClose, onSuccess, department }) {
    // const [name, setName] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(departmentSchema),
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
       notifications.show({
                title: "Error",
                message: department
                    ? "Failed to update department."
                    : "Failed to create department.",
                color: "red",
                position:"top-left",
                icon:<IconCheck size={18}/>
            });

    } finally {

        setSaving(false);

    }
}


    const handleClose = () =>{
        reset()
        onClose()
    }


    return (
        <Modal
            opened={show}
            onClose={onClose}
            title={department ? "Edit Department" : "Add Department"}
            centered
                >
                    <form onSubmit={handleSubmit(handleSave)}>
               
                        <TextInput
                            label="Department Name"
                            placeholder="Enter department name"
                            mb="md"
                            {...register("name")}                        
                           error = {errors.name?.message}
                        />

                        <Group
                            justify="flex"
                            mt="xl"
                        > 
                            <Button
                                variant="default"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                loading={saving}
                            >
                              {department ? "Update": "Save"}
                            </Button>
                        </Group>
                </form>  

        </Modal>
    );
}

export default DepartmentModal;