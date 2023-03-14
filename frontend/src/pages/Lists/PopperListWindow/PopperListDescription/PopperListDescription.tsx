import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";

import { PROFILE } from "../../../../constants/path-constants";
import { usePopperListWindowStyles } from "../PopperListWindowStyles";
import {
    selectListDetailItemDescription,
    selectListDetailItemName,
    selectListDetailItemOwnerAvatar,
    selectListDetailItemOwnerFullName,
    selectListDetailItemOwnerId,
    selectListDetailItemOwnerUsername
} from "../../../../store/ducks/listDetail/selectors";

const PopperListDescription = memo((): ReactElement => {
    const classes = usePopperListWindowStyles();
    const listName = useSelector(selectListDetailItemName);
    const listDescription = useSelector(selectListDetailItemDescription);
    const listOwnerId = useSelector(selectListDetailItemOwnerId);
    const listOwnerFullName = useSelector(selectListDetailItemOwnerFullName);
    const listOwnerUsername = useSelector(selectListDetailItemOwnerUsername);
    const listOwnerAvatar = useSelector(selectListDetailItemOwnerAvatar);

    return (
        <>
            <Typography variant={"h5"} component={"div"} className={classes.popperListTitle}>
                {listName}
            </Typography>
            <Typography variant={"body1"} component={"div"} className={classes.popperListDescription}>
                {listDescription}
            </Typography>
            <Link to={`${PROFILE}/${listOwnerId}`} className={classes.popperListOwnerLink}>
                <div className={classes.popperListOwnerWrapper}>
                    <Avatar className={classes.popperListOwnerAvatar} src={listOwnerAvatar} />
                </div>
                <Typography variant={"h6"} component={"span"} className={classes.popperListOwnerFullName}>
                    {listOwnerFullName}
                </Typography>
                <Typography variant={"subtitle1"} component={"span"} className={classes.popperListOwnerUsername}>
                    @{listOwnerUsername}
                </Typography>
            </Link>
        </>
    );
});

export default PopperListDescription;
