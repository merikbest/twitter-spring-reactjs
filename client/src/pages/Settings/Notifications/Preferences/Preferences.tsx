import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {ArrowRightIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";
import {SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS, SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS} from "../../../../util/pathConstants";

const Preferences: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Select your preferences by notification type. `}
                    <MuiLink
                        href="https://help.twitter.com/managing-your-account/notifications-on-mobile-devices"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Link to={SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Push notifications
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Link to={SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Email notifications
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(Preferences);
