import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, IconButton, Paper, Typography} from "@material-ui/core";

import {Lists} from "../../../store/ducks/lists/contracts/state";
import {useListsItemStyles} from "./ListsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {PinIcon, PinIconFilled} from "../../../icons";
import {followList, pinList, unfollowList, unpinList} from "../../../store/ducks/lists/actionCreators";
import PopperListWindow from "../PopperListWindow/PopperListWindow";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../../hoc/withHoverAction";

interface ListsItemProps<T> {
    item?: T;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps<Lists> & HoverActionProps> = (
    {
        item: list,
        listIndex,
        isMyList,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
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

        if (list?.pinnedDate) {
            dispatch(unpinList(list!.id));
        } else {
            dispatch(pinList(list!.id));
        }
    };

    const handleHoverList = (): void => {
        setDelayHandler(setTimeout(() => setVisiblePopperListWindow(true), 1000));
    };

    const handleLeaveList = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperListWindow(false);
    };

    return (
        <Link to={`/lists/${list?.id}`} className={classes.link}>
            <Paper className={classes.container} style={{border: (listIndex === 2) ? 0 : 1}} variant="outlined">
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                />
                <div className={classes.listInfoContainer}>
                    <div className={classes.listInfoWrapper} onMouseEnter={handleHoverList} onMouseLeave={handleLeaveList}>
                        <Typography component={"div"} className={classes.listTitle}>
                            {list?.name}
                        </Typography>
                        <div className={classes.listOwnerWrapper}>
                            <Avatar
                                className={classes.listOwnerAvatar}
                                src={list?.listOwner.avatar?.src ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                            />
                        </div>
                        <div className={classes.listOwnerInfoWrapper}>
                            <Typography component={"span"} className={classes.listOwnerFullName}>
                                {list?.listOwner.fullName}
                            </Typography>
                            <Typography component={"span"} className={classes.listOwnerUsername}>
                                @{list?.listOwner.username}
                            </Typography>
                        </div>
                        <PopperListWindow visible={visiblePopperListWindow} list={list!}/>
                    </div>
                    {isMyList && (
                        <div className={classes.listPinWrapper}>
                            <IconButton
                                onClick={event => onClickPinList(event)}
                                onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                                onMouseLeave={handleLeaveAction}
                                color="primary"
                            >
                                {list?.pinnedDate ? (
                                    <>{PinIconFilled}</>
                                ) : (
                                    <>{PinIcon}</>
                                )}
                                <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={list?.pinnedDate ? "Unpin" : "Pin"}/>
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

export default withHoverAction(ListsItem);
