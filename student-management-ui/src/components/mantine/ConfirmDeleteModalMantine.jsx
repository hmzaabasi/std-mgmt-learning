import { Modal, Text, Button, Group } from "@mantine/core";

function ConfirmDeleteModal({
    show,
    title,
    message,
    onConfirm,
    onCancel
}) {


    return (
        <Modal 
            opened={show}
            onClose={onCancel}
            title={title}
            centered
            >
             
                        <Text mb="sm">
                            {message}
                        </Text>

                        <Text
                            c="red"
                            size="sm"
                            mb="lg"
                        >
                            This action cannot be undone.
                        </Text>
                    

                    <Group
                        justify="flex-end"
                        mt="xl"
                    >

                        <Button
                            variant="default"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="red"
                            onClick={onConfirm}
                        >
                            Delete
                        </Button>

                    </Group>

             
        </Modal>
    );
}

export default ConfirmDeleteModal;