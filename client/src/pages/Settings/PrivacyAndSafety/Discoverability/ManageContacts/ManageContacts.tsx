import React, {FC, ReactElement} from 'react';

import {useManageContactsStyles} from "./ManageContactsStyles";
import {Divider, Typography} from "@material-ui/core";

const ManageContacts: FC = (): ReactElement => {
    const classes = useManageContactsStyles();

    return (
        <>
            <div className={classes.removeContacts}>
                <Typography component={"span"}>
                    Remove all contacts
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    These are the contacts that you have imported from your mobile devices. This information is used to
                    personalize your experience on Twitter, such as suggesting accounts to follow. You can remove any
                    contacts you’ve previously uploaded and turn off syncing with Twitter on all devices. Please be
                    aware that this takes a little time. <a
                    href={"https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Divider/>
        </>
    );
};

export default ManageContacts;
