function ConfirmSwitchModal({
    show,
    framework,
    onConfirm,
    onCancel
}) {

    if (!show) return null;

    return (
        <div className="modal d-block">
            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Switch to New Look
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onCancel}
                        />

                    </div>

                    <div className="modal-body">

                        <p>
                            Switch to{" "}
                            <strong>
                                {framework === "bootstrap"
                                    ? "Mantine UI"
                                    : "Bootstrap UI"}
                            </strong>
                            ?
                        </p>

                        <p className="text-muted mb-0">
                            The current page will remain open after switching.
                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={onConfirm}
                        >
                            Switch
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default ConfirmSwitchModal;