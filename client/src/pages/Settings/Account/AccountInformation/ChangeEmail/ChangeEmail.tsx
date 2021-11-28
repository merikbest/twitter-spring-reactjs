import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, Typography} from "@material-ui/core";

import {useChangeEmailStyles} from "./ChangeEmailStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import {selectUserData, selectUserIsSuccess} from "../../../../../store/ducks/user/selectors";
import ChangeEmailModal from "./ChangeEmailModal/ChangeEmailModal";
import {setUserLoadingStatus} from "../../../../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../../../../store/types";

const ChangeEmail: FC = (): ReactElement => {
    const classes = useChangeEmailStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isUpdatedSuccess = useSelector(selectUserIsSuccess);
    const [visibleChangeEmailModal, setVisibleChangeEmailModal] = useState<boolean>(false);

    useEffect(() => {
        setVisibleChangeEmailModal(false);
        dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
    }, [isUpdatedSuccess]);

    const onOpenChangeEmailModal = (): void => {
        setVisibleChangeEmailModal(true);
    };

    const onCloseChangeEmailModal = (): void => {
        setVisibleChangeEmailModal(false);
    };

    return (
        <>
            <div className={classes.textFieldWrapper}>
                <ChangeInfoTextField
                    disabled={true}
                    label="Current"
                    type="text"
                    variant="filled"
                    value={myProfile?.email}
                    fullWidth
                />
            </div>
            <Divider/>
            <div className={classes.updateEmailAddress} onClick={onOpenChangeEmailModal}>
                <Typography component={"span"}>
                    Update email address
                </Typography>
            </div>
            {visibleChangeEmailModal && (
                <ChangeEmailModal
                    visible={visibleChangeEmailModal}
                    onClose={onCloseChangeEmailModal}
                />
            )}
        </>
    );
};

export default ChangeEmail;
