import {
    Modal,
    Button,
    Group,
    Text
} from "@mantine/core";

function ConfirmSwitchModalMantine({
    show,
    framework,
    onConfirm,
    onCancel
}) {

    return (
        <Modal
            opened={show}
            onClose={onCancel}
            title="Switch UI Framework"
            centered
        >

            <Text mb="md">
                Switch to{" "}
                <strong>
                    {framework === "bootstrap"
                        ? "Mantine UI"
                        : "Bootstrap UI"}
                </strong>
                ?
            </Text>

            <Text
                c="dimmed"
                size="sm"
            >
                The current page will remain open after switching.
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
                    onClick={onConfirm}
                >
                    Switch
                </Button>

            </Group>

        </Modal>
    );
}

export default ConfirmSwitchModalMantine;