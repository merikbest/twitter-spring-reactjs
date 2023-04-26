import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Typography } from "@material-ui/core";

import { useChangeEmailStyles } from "./ChangeEmailStyles";
import { ChangeInfoTextField } from "../../../ChangeInfoTextField/ChangeInfoTextField";
import { selectUserIsSuccess, selectUserProfileEmail } from "../../../../../store/ducks/user/selectors";
import ChangeEmailModal from "./ChangeEmailModal/ChangeEmailModal";
import { setUserLoadingStatus } from "../../../../../store/ducks/user/actionCreators";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { LoadingStatus } from "../../../../../types/common";
import { useModalWindow } from "../../../../../hook/useModalWindow";

const ChangeEmail: FC = (): ReactElement => {
    const classes = useChangeEmailStyles();
    const dispatch = useDispatch();
    const myProfileEmail = useSelector(selectUserProfileEmail);
    const isUpdatedSuccess = useSelector(selectUserIsSuccess);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    useEffect(() => {
        onCloseModalWindow();
        dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
    }, [isUpdatedSuccess]);

    return (
        <>
            <div className={classes.textFieldWrapper}>
                <ChangeInfoTextField
                    label="Current"
                    type="text"
                    variant="filled"
                    value={myProfileEmail}
                    fullWidth
                    disabled
                />
            </div>
            <Divider />
            <div
                id={"openChangeEmailModal"}
                className={classes.updateEmailAddress}
                onClick={onOpenModalWindow}
            >
                <Typography variant={"body1"} component={"span"}>
                    Update email address
                </Typography>
            </div>
            <ChangeEmailModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default withDocumentTitle(ChangeEmail)("Change email");
