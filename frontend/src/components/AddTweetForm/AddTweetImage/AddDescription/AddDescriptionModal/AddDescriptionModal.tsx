import React, { FC, ReactElement } from "react";
import { Dialog } from "@material-ui/core";

interface AddDescriptionModalProps {
    visible?: boolean;
    onClose: () => void;
}

const AddDescriptionModal: FC<AddDescriptionModalProps> = ({ visible, onClose }): ReactElement | null => {

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            AddDescriptionModal
        </Dialog>
    );
};

export default AddDescriptionModal;
