import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { USER } from "../../../constants/path-constants";
import { selectUserDetailFollowersCount, selectUserDetailId } from "../../../store/ducks/userDetail/selectors";
import { usePopperFooterStyles } from "./PopperFooterStyles";

const PopperFooterFollowing = memo((): ReactElement => {
    const classes = usePopperFooterStyles();
    const userId = useSelector(selectUserDetailId);
    const followersSize = useSelector(selectUserDetailFollowersCount);
    const { t } = useTranslation();

    return (
        <Link to={`${USER}/${userId}/following`} className={classes.followLink}>
            <Typography variant="h6" component="span">
                {followersSize}
            </Typography>
            <Typography variant="subtitle1" component="span">
                {t("FOLLOWING", { defaultValue: "Following" })}
            </Typography>
        </Link>
    );
});

export default PopperFooterFollowing;
