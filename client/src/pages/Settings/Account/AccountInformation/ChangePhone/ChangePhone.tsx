import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, Typography} from "@material-ui/core";

import {useChangePhoneStyles} from "./ChangePhoneStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import ChangePhoneModal from "./ChangePhoneModal/ChangePhoneModal";
import {selectUserData, selectUserIsSuccess} from "../../../../../store/ducks/user/selectors";
import {getPhoneCode} from "../../../../../util/countryCodes";
import {setUserLoadingStatus} from "../../../../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../../../../store/types";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";

const ChangePhone: FC = (): ReactElement => {
    const classes = useChangePhoneStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isUpdatedSuccess = useSelector(selectUserIsSuccess);
    const [visibleChangePhoneModal, setVisibleChangePhoneModal] = useState<boolean>(false);

    useEffect(() => {
        setVisibleChangePhoneModal(false);
        dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
    }, [isUpdatedSuccess]);

    const onOpenChangePhoneModal = (): void => {
        setVisibleChangePhoneModal(true);
    };

    const onCloseChangePhoneModal = (): void => {
        setVisibleChangePhoneModal(false);
    };

    return (
        <>
            <div className={classes.textFieldWrapper}>
                <ChangeInfoTextField
                    disabled={true}
                    label="Current"
                    type="text"
                    variant="filled"
                    value={`${getPhoneCode(myProfile?.countryCode)}${myProfile?.phone}`}
                    fullWidth
                />
            </div>
            <Divider/>
            <div className={classes.updatePhoneNumber} onClick={onOpenChangePhoneModal}>
                <Typography variant={"body1"} component={"span"}>
                    Update phone number
                </Typography>
            </div>
            <div className={classes.deletePhoneNumber}>
                <Typography variant={"body1"} component={"span"}>
                    Delete phone number
                </Typography>
            </div>
            {visibleChangePhoneModal && <ChangePhoneModal visible={visibleChangePhoneModal} onClose={onCloseChangePhoneModal}/>}
        </>
    );
};

export default withDocumentTitle(ChangePhone);
