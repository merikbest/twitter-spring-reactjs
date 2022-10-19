import React, {ReactElement, useState} from "react";
import {Button} from "@material-ui/core";

import {useEditListButtonStyles} from "./EditListButtonStyles";
import EditListModal from "./EditListModal/EditListModal";

const EditListButton = (): ReactElement => {
    const classes = useEditListButtonStyles();
    const [visibleEditListModal, setVisibleEditListModal] = useState<boolean>(false);

    const onOpenEditListModal = (): void => {
        setVisibleEditListModal(true);
    };

    const onCloseCreateListModal = (): void => {
        setVisibleEditListModal(false);
    };

    return (
        <>
            <Button
                className={classes.listOutlinedButton}
                onClick={onOpenEditListModal}
                variant="outlined"
                color="primary"
                size="small"
            >
                Edit List
            </Button>
            <EditListModal visible={visibleEditListModal} onClose={onCloseCreateListModal}/>
        </>
    );
};

export default EditListButton;
