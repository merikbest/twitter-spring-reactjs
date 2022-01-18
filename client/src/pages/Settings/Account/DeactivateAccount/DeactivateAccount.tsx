import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Avatar, Divider, Link as MuiLink, Typography} from "@material-ui/core";

import {useDeactivateAccountStyles} from "./DeactivateAccountStyles";
import {selectUserData} from "../../../../store/ducks/user/selectors";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";

const DeactivateAccount: FC = (): ReactElement => {
    const classes = useDeactivateAccountStyles();
    const myProfile = useSelector(selectUserData);

    return (
        <div className={classes.deactivateAccountWrapper}>
            <Link to={`/user/${myProfile?.id}`}>
                <div className={classes.userInfoWrapper}>
                    <Avatar
                        className={classes.avatar}
                        alt={`avatar ${myProfile?.id}`}
                        src={myProfile?.avatar?.src ? myProfile?.avatar?.src : DEFAULT_PROFILE_IMG}
                    />
                    <div className={classes.usernameWrapper}>
                        <Typography variant={"h6"} component={"div"}>
                            {myProfile?.fullName}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            @{myProfile?.username}
                        </Typography>
                    </div>
                </div>
            </Link>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    This will deactivate your account
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    You’re about to start the process of deactivating your Twitter account. Your display name,
                    @username, and public profile will no longer be viewable on Twitter.com, Twitter for iOS, or
                    Twitter for Android.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    What else you should know
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    You can restore your Twitter account if it was accidentally or wrongfully deactivated for up
                    to 30 days after deactivation.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {"Some account information may still be available in search engines, such as Google or Bing. "}
                    <MuiLink
                        href="https://help.twitter.com/safety-and-security/remove-twitter-profile-from-google-search"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    If you just want to change your @username, you don’t need to deactivate your account — edit
                    it in your <Link to={"/settings/info"} className={classes.routerLink}>settings.</Link>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    To use your current @username or email address with a different Twitter account,
                    <Link to={"/settings/info"} className={classes.routerLink}> change them </Link>
                    before you deactivate this account.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    If you want to download your Twitter data, you’ll need to complete both the request and
                    download process before deactivating your account. Links to download your data cannot be
                    sent to deactivated accounts.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.deleteUser}>
                <Typography variant={"body1"} component={"span"}>
                    Deactivate
                </Typography>
            </div>
        </div>
    );
};

export default DeactivateAccount;
