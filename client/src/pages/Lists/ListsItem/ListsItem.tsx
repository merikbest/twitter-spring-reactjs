import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, IconButton, Paper} from "@material-ui/core";

import {Lists} from "../../../store/ducks/lists/contracts/state";
import {useListsItemStyles} from "./ListsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {PinIcon, PinIconFilled} from "../../../icons";
import {followList, pinList, unfollowList, unpinList} from "../../../store/ducks/lists/actionCreators";
import PopperListWindow from "../PopperListWindow/PopperListWindow";

interface ListsItemProps {
    list: Lists;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps> = ({list, listIndex, isMyList}): ReactElement => {
    const classes = useListsItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const follower = list?.followers.find((follower) => follower.id === myProfile?.id);

    const [btnText, setBtnText] = useState<string>("Following");
    const [visiblePopperListWindow, setVisiblePopperListWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const onClickFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (follower) {
            dispatch(unfollowList(list?.id!));
        } else {
            dispatch(followList(list?.id!));
        }
    };

    const onClickPinList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (list.pinnedDate) {
            dispatch(unpinList(list.id));
        } else {
            dispatch(pinList(list.id));
        }
    };

    const handleHover = (): void => {
        setDelayHandler(setTimeout(() => setVisiblePopperListWindow(true), 1337));
    };

    const handleLeave = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperListWindow(false);
    };

    return (
        <Link to={`/lists/${list.id}`} className={classes.link}>
            <Paper className={classes.container} style={{border: (listIndex === 2) ? 0 : 1}} variant="outlined">
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={list.wallpaper?.src ? list.wallpaper?.src : list.altWallpaper}
                />
                <div className={classes.listInfoContainer}>
                    <div className={classes.listInfoWrapper} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
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
                        {visiblePopperListWindow && <PopperListWindow list={list}/>}
                    </div>
                    {isMyList && (
                        <div className={classes.listPinWrapper}>
                            <IconButton onClick={event => onClickPinList(event)} color="primary">
                                {list.pinnedDate ? (
                                    <>{PinIconFilled}</>
                                ) : (
                                    <>{PinIcon}</>
                                )}
                            </IconButton>
                        </div>
                    )}
                    {(myProfile?.id === list?.listOwner.id || isMyList) ? null : (
                        follower ? (
                            <Button
                                className={classes.listPrimaryButton}
                                onMouseOver={() => setBtnText("Unfollow")}
                                onMouseLeave={() => setBtnText("Following")}
                                onClick={event => onClickFollow(event)}
                                color="primary"
                                variant="contained"
                            >
                                {btnText}
                            </Button>
                        ) : (
                            <Button
                                className={classes.listOutlinedButton}
                                onClick={event => onClickFollow(event)}
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
