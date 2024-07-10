import React, { FC, ReactElement, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useModalWindow } from "../../../../../../hook/useModalWindow";
import ChangePhoneModal from "./ChangePhoneModal/ChangePhoneModal";
import { setUserLoadingStatus } from "../../../../../../store/ducks/user/actionCreators";
import { LoadingStatus } from "../../../../../../types/common";
import { selectUserIsLoaded } from "../../../../../../store/ducks/user/selectors";
import { useUpdatePhoneNumberButtonStyles } from "./UpdatePhoneNumberButtonStyles";

const UpdatePhoneNumberButton: FC = (): ReactElement => {
    const classes = useUpdatePhoneNumberButtonStyles();
    const dispatch = useDispatch();
    const isUpdatedSuccess = useSelector(selectUserIsLoaded);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    useEffect(() => {
        onCloseModalWindow();
        dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
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
