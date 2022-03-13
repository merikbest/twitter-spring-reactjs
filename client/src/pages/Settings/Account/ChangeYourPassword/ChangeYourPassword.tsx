import React, {FC, ReactElement, useState} from 'react';
import {Button, Divider, Link as MuiLink} from "@material-ui/core";
import classnames from "classnames";

import {useChangeYourPasswordStyles} from "./ChangeYourPasswordStyles";
import {ChangeInfoTextField} from "../../ChangeInfoTextField/ChangeInfoTextField";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const ChangeYourPassword: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useChangeYourPasswordStyles();
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPassword2, setNewPassword2] = useState<string>("");

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <ChangeInfoTextField
                    label="Current password"
                    type="text"
                    variant="filled"
                    value={currentPassword}
                    fullWidth
                />
                <MuiLink href="#" variant="body1">
                    Forgot password?
                </MuiLink>
            </div>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <ChangeInfoTextField
                    label="New password"
                    type="text"
                    variant="filled"
                    value={newPassword}
                    fullWidth
                />
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <ChangeInfoTextField
                    label="Confirm password"
                    type="text"
                    variant="filled"
                    value={newPassword2}
                    fullWidth
                />
            </div>
            <Divider/>
            <div className={classnames(classes.buttonWrapper, globalClasses.itemInfoWrapper)}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default withDocumentTitle(ChangeYourPassword);
