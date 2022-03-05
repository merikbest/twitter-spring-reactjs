import React, {ComponentType, FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, IconButton, Paper, Typography} from "@material-ui/core";
import {compose} from "recompose";

import {useListsItemStyles} from "./ListsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {LockIcon, PinIcon, PinIconFilled} from "../../../icons";
import {followList, pinList, unfollowList, unpinList} from "../../../store/ducks/lists/actionCreators";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../../hoc/withHoverAction";
import {useGlobalStyles} from "../../../util/globalClasses";
import {ListResponse, ListUserResponse} from "../../../store/types/lists";
import {HoverListProps, withHoverList} from "../../../hoc/withHoverList";
import PopperListWindow from "../PopperListWindow/PopperListWindow";

interface ListsItemProps<T> {
    item?: T;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps<ListResponse | ListUserResponse> & HoverActionProps & HoverListProps> = (
    {
        item: list,
        listIndex,
        isMyList,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useListsItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");

    const onClickFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if ("isFollower" in list! && list.isFollower) {
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

    return (
        <Link to={`/lists/${list?.id}`} className={globalClasses.link}>
            <Paper className={classes.container} style={{border: (listIndex === 2) ? 0 : 1}} variant="outlined">
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                />
                <div className={classes.listInfoContainer}>
                    <div
                        className={classes.listInfoWrapper}
                        onMouseEnter={() => handleHoverPopper!(list?.id!)}
                        onMouseLeave={handleLeavePopper}
                    >
                        <div>
                            <Typography variant={"h6"} component={"span"} className={classes.listTitle}>
                                {list?.name}
                            </Typography>
                            {"isPrivate" in list! && list?.isPrivate && (
                                <span className={classes.lockIcon}>
                                    {LockIcon}
                                </span>
                            )}
                        </div>
                        <Typography variant={"subtitle2"} component={"div"}>
                            {list?.description}
                        </Typography>
                        <div className={classes.listOwnerWrapper}>
                            <Avatar
                                className={classes.listOwnerAvatar}
                                src={list?.listOwner.avatar?.src ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                            />
                        </div>
                        <div className={classes.listOwnerInfoWrapper}>
                            <Typography variant={"subtitle2"} component={"span"} className={classes.listOwnerFullName}>
                                {list?.listOwner.fullName}
                            </Typography>
                            <Typography variant={"subtitle2"} component={"span"}>
                                @{list?.listOwner.username}
                            </Typography>
                        </div>
                        <PopperListWindow visible={visiblePopperWindow}/>
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
                                <HoverAction
                                    visible={visibleHoverAction?.visibleOtherAction}
                                    actionText={list?.pinnedDate ? "Unpin" : "Pin"}
                                />
                            </IconButton>
                        </div>
                    )}
                    {(myProfile?.id === list?.listOwner.id || isMyList) ? null : (
                        "isFollower" in list! && list.isFollower ? (
                            <Button
                                className={classes.listPrimaryButton}
                                onMouseOver={() => setBtnText("Unfollow")}
                                onMouseLeave={() => setBtnText("Following")}
                                onClick={event => onClickFollow(event)}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                {btnText}
                            </Button>
                        ) : (
                            <Button
                                className={classes.listOutlinedButton}
                                onClick={event => onClickFollow(event)}
                                variant="outlined"
                                color="primary"
                                size="small"
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

export default compose(withHoverAction, withHoverList)(ListsItem) as ComponentType<ListsItemProps<ListResponse | ListUserResponse> & HoverActionProps & HoverListProps>;
