import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Typography } from "@material-ui/core";

import { LockIcon } from "../../../icons";
import { PROFILE } from "../../../constants/path-constants";
import { useFullListStyles } from "../FullListStyles";
import {
    selectListItemDescription,
    selectListItemIsPrivate,
    selectListItemName,
    selectListItemOwnerAvatar,
    selectListItemOwnerFullName,
    selectListItemOwnerId,
    selectListItemOwnerUsername
} from "../../../store/ducks/list/selectors";

const FullListDescription = memo((): ReactElement => {
    const classes = useFullListStyles();
    const listOwnerId = useSelector(selectListItemOwnerId);
    const listName = useSelector(selectListItemName);
    const listDescription = useSelector(selectListItemDescription);
    const listIsPrivate = useSelector(selectListItemIsPrivate);
    const listOwnerAvatar = useSelector(selectListItemOwnerAvatar);
    const listOwnerFullName = useSelector(selectListItemOwnerFullName);
    const listOwnerUsername = useSelector(selectListItemOwnerUsername);

    return (
        <>
            <div>
                <Typography variant={"h5"} component={"span"}>
                    {listName}
                </Typography>
                {listIsPrivate && <span className={classes.lockIcon}>{LockIcon}</span>}
            </div>
            <Typography variant={"body1"} component={"div"}>
                {listDescription}
            </Typography>
            <Link to={`${PROFILE}/${listOwnerId}`} className={classes.listOwnerLink}>
                <div className={classes.listOwnerWrapper}>
                    <Avatar className={classes.listOwnerAvatar} src={listOwnerAvatar} />
                </div>
                <Typography variant={"h6"} component={"span"}>
                    {listOwnerFullName}
                </Typography>
                <Typography variant={"subtitle1"} component={"span"}>
                    @{listOwnerUsername}
                </Typography>
            </Link>
        </>
    );
});

export default FullListDescription;
