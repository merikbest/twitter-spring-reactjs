import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Avatar, Divider, Typography} from "@material-ui/core";

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
                        <Typography component={"div"} className={classes.fullName}>
                            {myProfile?.fullName}
                        </Typography>
                        <Typography component={"div"} className={classes.username}>
                            @{myProfile?.username}
                        </Typography>
                    </div>
                </div>
            </Link>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    This will deactivate your account
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    You’re about to start the process of deactivating your Twitter account. Your display name,
                    @username, and public profile will no longer be viewable on Twitter.com, Twitter for iOS, or
                    Twitter for Android.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    What else you should know
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    You can restore your Twitter account if it was accidentally or wrongfully deactivated for up
                    to 30 days after deactivation.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Some account information may still be available in search engines, such as Google or Bing.
                    <a href={"https://help.twitter.com/safety-and-security/remove-twitter-profile-from-google-search"}
                       target="_blank"
                       className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    If you just want to change your @username, you don’t need to deactivate your account — edit
                    it in your <Link to={"/settings/info"} className={classes.link}>settings.</Link>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    To use your current @username or email address with a different Twitter account,
                    <Link to={"/settings/info"} className={classes.link}> change them </Link>
                    before you deactivate this account.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    If you want to download your Twitter data, you’ll need to complete both the request and
                    download process before deactivating your account. Links to download your data cannot be
                    sent to deactivated accounts.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.deleteUser}>
                <Typography component={"span"}>
                    Deactivate
                </Typography>
            </div>
        </div>
    );
};

export default DeactivateAccount;
