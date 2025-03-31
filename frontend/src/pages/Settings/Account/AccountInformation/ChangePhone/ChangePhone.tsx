import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useChangePhoneStyles } from "./ChangePhoneStyles";
import { ChangeInfoTextField } from "../../../ChangeInfoTextField/ChangeInfoTextField";
import { selectUserProfilePhoneCode, selectUserProfilePhoneNumber } from "../../../../../store/ducks/user/selectors";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import DeletePhoneNumberButton from "./DeletePhoneNumberButton/DeletePhoneNumberButton";
import UpdatePhoneNumberButton from "./UpdatePhoneNumberButton/UpdatePhoneNumberButton";

const ChangePhone: FC = (): ReactElement => {
    const classes = useChangePhoneStyles();
    const phoneCode = useSelector(selectUserProfilePhoneCode);
    const phoneNumber = useSelector(selectUserProfilePhoneNumber);
    const { t } = useTranslation();

    return (
        <>
            {phoneCode &&
                <div className={classes.textFieldWrapper}>
                    <ChangeInfoTextField
                        label={t("CURRENT", { defaultValue: "Current" })}
                        type="text"
                        variant="filled"
                        value={`${phoneCode}${phoneNumber}`}
                        fullWidth
                        disabled
                    />
                    <Divider />
                </div>
            }
            <UpdatePhoneNumberButton />
            {phoneCode && <DeletePhoneNumberButton />}
        </>
    );
};

export default withDocumentTitle(ChangePhone)("Change phone");
