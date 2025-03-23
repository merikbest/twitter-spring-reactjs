import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { SOMEONE_BLOCKED_ME_ON_TWITTER } from "../../../constants/url-constants";
import { selectUserProfileUsername } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const UserBlockedMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const username = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();

    return (
        <div className={classes.privateProfileInfo}>
            <Typography variant="h4" component="div">
                {t("YOU_ARE_BLOCKED", { defaultValue: "You’re blocked" })}
            </Typography>
            <Typography variant="subtitle1" component="div">
                {t("YOU_ARE_BLOCKED_DESCRIPTION", {
                    username,
                    defaultValue: `You can’t follow or see @${username}’s Tweets.`})}
                <MuiLink href={SOMEONE_BLOCKED_ME_ON_TWITTER} variant="subtitle1" target="_blank" rel="noopener">
                    {t("LEARN_MORE", { defaultValue: "Learn more" })}
                </MuiLink>
            </Typography>
        </div>
    );
});

export default UserBlockedMessage;
