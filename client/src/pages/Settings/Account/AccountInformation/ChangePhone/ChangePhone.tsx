import React, {FC, ReactElement, useState} from 'react';
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";

import {useChangePhoneStyles} from "./ChangePhoneStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import ChangePhoneModal from "./ChangePhoneModal/ChangePhoneModal";
import {selectUserData} from "../../../../../store/ducks/user/selectors";
import {getPhoneCode} from "../../../../../util/countryCodes";

const ChangePhone: FC = (): ReactElement => {
    const classes = useChangePhoneStyles();
    const myProfile = useSelector(selectUserData);
    const [visibleChangePhoneModal, setVisibleChangePhoneModal] = useState<boolean>(false);

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
                    value={`${getPhoneCode(myProfile)}${myProfile?.phone}`}
                    fullWidth
                />
            </div>
            <div className={classes.divider}/>
            <div className={classes.updatePhoneNumber} onClick={onOpenChangePhoneModal}>
                <Typography component={"span"}>
                    Update phone number
                </Typography>
            </div>
            <div className={classes.deletePhoneNumber}>
                <Typography component={"span"}>
                    Delete phone number
                </Typography>
            </div>
            {visibleChangePhoneModal && <ChangePhoneModal visible={visibleChangePhoneModal} onClose={onCloseChangePhoneModal}/>}
        </>
    );
};

export default ChangePhone;
