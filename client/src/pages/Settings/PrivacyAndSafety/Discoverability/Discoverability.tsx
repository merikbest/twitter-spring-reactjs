import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Checkbox, Divider, Typography} from "@material-ui/core";

import {useDiscoverabilityStyles} from "./DiscoverabilityStyles";
import {ArrowRightIcon} from "../../../../icons";

const Discoverability: FC = (): ReactElement => {
    const classes = useDiscoverabilityStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Control your discoverability settings and manage contacts you’ve imported.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Discoverability
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Decide whether people who have your email address or phone number can find and connect with you on
                    Twitter.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Let people who have your email address find you on Twitter</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Let people who have your email address find and connect with you on Twitter.
                    <a
                        href={"https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Let people who have your phone number find you on Twitter</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Let people who have your phone number find and connect with you on Twitter.
                    <a
                        href={"https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Contacts
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage contacts that you have imported from your mobile devices.
                    <a
                        href={"https://help.twitter.com/using-twitter/upload-your-contacts-to-search-for-friends"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/contacts_dashboard"} className={classes.discoverabilityWrapper}>
                <div className={classes.discoverabilityLink}>
                    <Typography component={"span"}>
                        Manage contacts
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default Discoverability;
