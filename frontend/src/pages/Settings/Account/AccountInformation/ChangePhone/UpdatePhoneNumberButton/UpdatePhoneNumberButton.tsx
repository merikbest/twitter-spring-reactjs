import React, { FC, ReactElement, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { useModalWindow } from "../../../../../../hook/useModalWindow";
import ChangePhoneModal from "./ChangePhoneModal/ChangePhoneModal";
import { selectUserIsLoaded } from "../../../../../../store/ducks/user/selectors";
import { useUpdatePhoneNumberButtonStyles } from "./UpdatePhoneNumberButtonStyles";

const UpdatePhoneNumberButton: FC = (): ReactElement => {
    const classes = useUpdatePhoneNumberButtonStyles();
    const isUpdatedSuccess = useSelector(selectUserIsLoaded);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    useEffect(() => {
        onCloseModalWindow();
    }, [isUpdatedSuccess]);

    return (
        <div id={"openChangePhoneModal"} className={classes.updatePhoneNumber} onClick={onOpenModalWindow}>
            <Typography variant={"body1"} component={"span"}>
                Update phone number
            </Typography>
            <ChangePhoneModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default UpdatePhoneNumberButton;
