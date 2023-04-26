import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Typography } from "@material-ui/core";

import { useChangePhoneStyles } from "./ChangePhoneStyles";
import { ChangeInfoTextField } from "../../../ChangeInfoTextField/ChangeInfoTextField";
import ChangePhoneModal from "./ChangePhoneModal/ChangePhoneModal";
import {
    selectUserIsSuccess,
    selectUserProfileCountryCode,
    selectUserProfilePhone
} from "../../../../../store/ducks/user/selectors";
import { getPhoneCode } from "../../../../../util/country-code-helper";
import { setUserLoadingStatus } from "../../../../../store/ducks/user/actionCreators";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { LoadingStatus } from "../../../../../types/common";
import { useModalWindow } from "../../../../../hook/useModalWindow";

const ChangePhone: FC = (): ReactElement => {
    const classes = useChangePhoneStyles();
    const dispatch = useDispatch();
    const countryCode = useSelector(selectUserProfileCountryCode);
    const phone = useSelector(selectUserProfilePhone);
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
                    value={`${getPhoneCode(countryCode)}${phone}`}
                    fullWidth
                    disabled
                />
            </div>
            <Divider />
            <div
                id={"openChangePhoneModal"}
                className={classes.updatePhoneNumber}
                onClick={onOpenModalWindow}
            >
                <Typography variant={"body1"} component={"span"}>
                    Update phone number
                </Typography>
            </div>
            <div className={classes.deletePhoneNumber}>
                <Typography variant={"body1"} component={"span"}>
                    Delete phone number
                </Typography>
            </div>
            <ChangePhoneModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default withDocumentTitle(ChangePhone)("Change phone");
