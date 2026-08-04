import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import { getDepartments } from "../../services/departmentService"
import {
    createStudent,
    updateStudent
} from "../../services/studentService"

import { notifications } from "@mantine/notifications";
import {
    Modal,
    Button,
    TextInput,
    NumberInput,
    Select,
    Stack,
    Text,
    Group
} from "@mantine/core"

import { IconCheck } from "@tabler/icons-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { studentSchema } from "../../schemas/studentSchema";

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
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
} = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
        name: "",
        email: "",
        age: undefined,
        departmentId: undefined
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
        notifications.show({
                title: "Error",
                message: student
                    ? "Failed to update student."
                    : "Failed to create student.",
                color: "red",
                position:"top-left",
                icon:<IconCheck size={18}/>
            });

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
        setValue("departmentId", student.departmentId ?? null);

    } else {

        reset();

    }

}, [student, setValue, reset])

    useEffect(() => {

        void loadDepartments();

    }, []);


   return (

    <Modal
        opened={show}
        onClose={onClose}
        title={student ? "Edit Student" : "Add Student"}
        centered
        size="lg"
        radius="md"
    >

        <Stack gap="md">
                 <TextInput
                        label="Name"
                        placeholder="Enter student name"
                        {...register("name")}
                            />

                            {errors.name && (
                                <Text c="red" size="sm">
                                    {errors.name.message}
                                </Text>
                            )}
                        <TextInput
                                label="Email"
                                placeholder="Enter email"
                                {...register("email")}
                            />

                            {errors.email && (
                                <Text c="red" size="sm">
                                    {errors.email.message}
                                </Text>
                            )}
                        <Controller
                            name="age"
                            control={control}
                            render={({ field }) => (
                                <NumberInput
                                    label="Age"
                                    placeholder="Enter age"
                                    min={1}
                                    value={field.value}
                                    onChange={(value) => {
                                        if (value === "" || value === null) {
                                            field.onChange(undefined);
                                        } else {
                                            field.onChange(value);
                                        }
                                    }}
                                />
                            )}
                        />

                        {errors.age && (
                            <Text c="red" size="sm">
                                {errors.age.message}
                            </Text>
                        )}

                       <Controller
                            name="departmentId"
                            control={control}
                            render={({ field }) => (

                                <Select
                                    label="Department"
                                    placeholder="Select Department"
                                    data={departments.map(department => ({
                                        value: department.id.toString(),
                                        label: department.name
                                    }))}
                                    value={field.value?.toString() ?? undefined}
                                    onChange={(value) => 
                                        field.onChange(value ? Number(value) : undefined)
                                    }
                                />

                            )}
                        />

                        {errors.departmentId && (

                            <Text
                                c="red"
                                size="sm"
                            >
                                {errors.departmentId.message}
                            </Text>

                        )}
                    <Group justify="flex-end">

                            <Button
                                variant="default"
                                onClick={() => {
                                    reset();
                                    onClose();
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleSubmit(handleSave)}
                                loading={saving}
                            >
                                {student
                                    ? "Update"
                                    : "Save"}
                            </Button>

                        </Group>

           </Stack>

    </Modal>
        

    );
}

export default StudentModal;