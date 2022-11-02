import React, {FC, memo, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Paper, Typography} from "@material-ui/core";

import {useListsItemStyles} from "./ListsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {PinIcon, PinIconFilled} from "../../../icons";
import {pinList, unpinList} from "../../../store/ducks/lists/actionCreators";
import {useGlobalStyles} from "../../../util/globalClasses";
import {ListResponse, ListUserResponse} from "../../../store/types/lists";
import PopperListWindow from "../PopperListWindow/PopperListWindow";
import {LISTS} from "../../../util/pathConstants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import FollowListButton from "../../../components/FollowListButton/FollowListButton";
import {useHoverList} from "../../../hook/useHoverList";
import LockIcon from "../../../components/LockIcon/LockIcon";

interface ListsItemProps {
    list?: ListResponse | ListUserResponse;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps> = memo(({list, listIndex, isMyList}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useListsItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const {visiblePopperWindow, handleHoverPopper, handleLeavePopper} = useHoverList();
    const listWallpaper = list?.wallpaper ? list?.wallpaper?.src : list?.altWallpaper;
    const listOwnerAvatar = list?.listOwner.avatar ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG;

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
                <Avatar variant="square" className={classes.listAvatar} src={listWallpaper}/>
                <div className={classes.listInfoContainer}>
                    <div
                        id={"listInfoWrapper"}
                        className={classes.listInfoWrapper}
                        onMouseEnter={() => handleHoverPopper(list?.id!)}
                        onMouseLeave={handleLeavePopper}
                    >
                        <div>
                            <Typography variant={"h6"} component={"span"} className={classes.listTitle}>
                                {list?.name}
                            </Typography>
                            {"isPrivate" in list! && list?.isPrivate && <LockIcon/>}
                        </div>
                        <Typography variant={"subtitle2"} component={"div"}>
                            {list?.description}
                        </Typography>
                        <div className={classes.listOwnerWrapper}>
                            <Avatar className={classes.listOwnerAvatar} src={listOwnerAvatar}/>
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
});

export default ListsItem;
