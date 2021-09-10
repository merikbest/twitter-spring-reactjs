import React, {FC, ReactElement, useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {Avatar, Button, Paper} from "@material-ui/core";

import {Lists} from "../../../store/ducks/lists/contracts/state";
import {useListsItemStyles} from "./ListsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";

interface ListsItemProps {
    list: Lists;
}

const ListsItem: FC<ListsItemProps> = ({list}): ReactElement => {
    const classes = useListsItemStyles();
    const myProfile = useSelector(selectUserData);

    const [btnText, setBtnText] = useState<string>("Following");

    const follower = list?.followers.find((follower) => follower.id === myProfile?.id);

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        console.log(myProfile?.id)
    };

    const handleUnfollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        console.log(myProfile?.id)
    };

    return (
        <Link to={`/lists/${list.id}`} className={classes.link}>
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
                    {(myProfile?.id === list?.listOwner.id) ? null : (
                        follower ? (
                            <Button
                                className={classes.listPrimaryButton}
                                onMouseOver={() => setBtnText("Unfollow")}
                                onMouseLeave={() => setBtnText("Following")}
                                onClick={event => handleUnfollow(event)}
                                color="primary"
                                variant="contained"
                            >
                                {btnText}
                            </Button>
                        ) : (
                            <Button
                                className={classes.listOutlinedButton}
                                onClick={event => handleFollow(event)}
                                color="primary"
                                variant="outlined"
                            >
                                Follow
                            </Button>
                        )
                    )}
                </div>
            </Paper>
        </Link>
    );
};

export default ListsItem;
