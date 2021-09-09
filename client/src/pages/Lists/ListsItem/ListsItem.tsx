import React, {FC, ReactElement} from 'react';

import {Lists} from "../../../store/ducks/lists/contracts/state";
import {useListsItemStyles} from "./ListsItemStyles";
import {Avatar, Button, Paper} from "@material-ui/core";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";

interface ListsItemProps {
    list: Lists;
}

const ListsItem: FC<ListsItemProps> = ({list}): ReactElement => {
    const classes = useListsItemStyles();

    return (
        <Paper className={classes.container} variant="outlined">
            <Avatar
                variant="square"
                className={classes.listAvatar}
                src={list.wallpaper?.src ? list.wallpaper?.src : list.altWallpaper}
            />
            <div className={classes.listInfoContainer}>
                <div className={classes.listInfoWrapper}>
                    <div className={classes.listTitle}>{list.name}</div>
                    <div className={classes.listOwnerWrapper}>
                        <Avatar
                            className={classes.listOwnerAvatar}
                            src={list.listOwner.avatar?.src ? list.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                        />
                    </div>
                    <div className={classes.listOwnerInfoWrapper}>
                        <span className={classes.listOwnerFullName}>{list.listOwner.fullName}</span>
                        <span className={classes.listOwnerUsername}>@{list.listOwner.username}</span>
                    </div>
                </div>
                <Button
                    className={classes.listOutlinedButton}
                    // onClick={() => handleFollow(user)}
                    color="primary"
                    variant="outlined"
                >
                    Follow
                </Button>
            </div>
        </Paper>
    );
};

export default ListsItem;
