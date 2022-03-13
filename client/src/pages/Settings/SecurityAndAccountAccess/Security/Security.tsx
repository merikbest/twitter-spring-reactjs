import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Checkbox, Divider, Link as MuiLink, Typography} from "@material-ui/core";

import {ArrowRightIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const Security: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage your account’s security.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Two-factor authentication
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Help protect your account from unauthorized access by requiring a second authentication
                        method in addition to your Twitter password. You can choose a text message, authentication
                        app, or security key. `}
                    <MuiLink
                        href="https://help.twitter.com/managing-your-account/two-factor-authentication"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Link to={"/settings/security/login_verification"} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Two-factor authentication
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Additional password protection
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Enabling this setting adds extra security to your account by requiring additional
                    information to reset your password. If enabled, you must provide either the phone number or
                    email address associated with your account in order to reset your password.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Password reset protect
                    </Typography>
                    <Checkbox/>
                </div>
                <MuiLink
                    href="https://help.twitter.com/safety-and-security/account-security-tips"
                    variant="body1"
                    target="_blank"
                    rel="noopener"
                >
                    Learn more
                </MuiLink>
            </div>
        </>
    );
};

export default withDocumentTitle(Security);
