import React, {ComponentType, FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Paper, Typography} from "@material-ui/core";

import {useListsItemStyles} from "./ListsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {LockIcon, PinIcon, PinIconFilled} from "../../../icons";
import {pinList, unpinList} from "../../../store/ducks/lists/actionCreators";
import {useGlobalStyles} from "../../../util/globalClasses";
import {ListResponse, ListUserResponse} from "../../../store/types/lists";
import {HoverListProps, withHoverList} from "../../../hoc/withHoverList";
import PopperListWindow from "../PopperListWindow/PopperListWindow";
import {LISTS} from "../../../util/pathConstants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import FollowListButton from "../../../components/FollowListButton/FollowListButton";

interface ListsItemProps<T> {
    item?: T;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps<ListResponse | ListUserResponse> & HoverListProps> = (
    {
        item: list,
        listIndex,
        isMyList,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useListsItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

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
        <Link to={`${LISTS}/${list?.id}`} className={globalClasses.link}>
            <Paper className={classes.container} style={{border: (listIndex === 2) ? 0 : 1}} variant="outlined">
                <Avatar
                    variant="square"
                    className={classes.listAvatar}
                    src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                />
                <div className={classes.listInfoContainer}>
                    <div
                        id={"listInfoWrapper"}
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
                        <ActionIconButton
                            onClick={onClickPinList}
                            actionText={list?.pinnedDate ? "Unpin" : "Pin"}
                            icon={list?.pinnedDate ? PinIconFilled : PinIcon}
                        />
                    )}
                    {(myProfile?.id === list?.listOwner.id || isMyList) ? null : (
                        <FollowListButton
                            listId={list!.id}
                            isFollower={(list as ListResponse).isFollower}
                        />
                    )}
                </div>
            </Paper>
        </Link>
    );
};

export default withHoverList(ListsItem) as ComponentType<ListsItemProps<ListResponse | ListUserResponse> & HoverListProps>;
