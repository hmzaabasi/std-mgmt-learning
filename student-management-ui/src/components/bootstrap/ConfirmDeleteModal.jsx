function ConfirmDeleteModal({
    show,
    title,
    message,
    onConfirm,
    onCancel
}) {

    if (!show) {
        return null;
    }

    return (
        <div className="modal d-block" 
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                        >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            {title}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <p>{message}</p>

                        <p className="text-danger mb-0">
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;