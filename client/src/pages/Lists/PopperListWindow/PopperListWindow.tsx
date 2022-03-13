import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Button, Typography} from "@material-ui/core";

import {usePopperListWindowStyles} from "./PopperListWindowStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {followList, unfollowList} from "../../../store/ducks/lists/actionCreators";
import MembersAndFollowersModal from "../../FullList/EditListModal/MembersAndFollowersModal/MembersAndFollowersModal";
import {BaseListResponse} from "../../../store/types/lists";
import {selectListDetailItem} from "../../../store/ducks/listDetail/selectors";

interface PopperListWindowProps {
    list?: BaseListResponse;
    visible?: boolean;
}

const PopperListWindow: FC<PopperListWindowProps> = ({visible}): ReactElement | null => {
    const classes = usePopperListWindowStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const list = useSelector(selectListDetailItem);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (list?.isFollower) {
            dispatch(unfollowList(list?.id!));
        } else {
            dispatch(followList(list?.id!));
        }
    };

    const onOpenMembersModalWindow = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("List members");
    };

    const onOpenFollowersModalWindow = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("List followers");
    };

    const onCloseModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(false);
        setModalWindowTitle("");
    };

    if (!visible) {
        return null;
    }

    return (
        <div className={classes.popperListWindow}>
            <img
                className={classes.wallpaperListImg}
                key={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                alt={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
            />
            <div className={classes.popperListInfo}>
                <Typography variant={"h5"} component={"div"} className={classes.popperListTitle}>
                    {list?.name}
                </Typography>
                <Typography variant={"body1"} component={"div"} className={classes.popperListDescription}>
                    {list?.description}
                </Typography>
                <Link to={`/profile/${list?.listOwner.id}`} className={classes.popperListOwnerLink}>
                    <div className={classes.popperListOwnerWrapper}>
                        <Avatar
                            className={classes.popperListOwnerAvatar}
                            src={list?.listOwner.avatar?.src ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                        />
                    </div>
                    <Typography variant={"h6"} component={"span"} className={classes.popperListOwnerFullName}>
                        {list?.listOwner.fullName}
                    </Typography>
                    <Typography variant={"subtitle1"} component={"span"} className={classes.popperListOwnerUsername}>
                        @{list?.listOwner.username}
                    </Typography>
                </Link>
                <div>
                    <span onClick={event => onOpenMembersModalWindow(event)} className={classes.popperListMembers}>
                        <Typography variant={"h6"} component={"span"}>
                            {list?.membersSize}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            {" Members"}
                        </Typography>
                    </span>
                    <span onClick={event => onOpenFollowersModalWindow(event)} className={classes.popperListMembers}>
                        <Typography variant={"h6"} component={"span"}>
                            {list?.followersSize}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            {" Followers"}
                        </Typography>
                    </span>
                </div>
                <div className={classes.buttonWrapper}>
                    {(myProfile?.id === list?.listOwner.id) ? null :
                        (list?.isFollower ? (
                            <Button
                                className={classes.primaryButton}
                                onMouseOver={() => setBtnText("Unfollow")}
                                onMouseLeave={() => setBtnText("Following")}
                                onClick={event => handleFollow(event)}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                {btnText}
                            </Button>
                        ) : (
                            <Button
                                className={classes.outlinedButton}
                                onClick={event => handleFollow(event)}
                                variant="outlined"
                                color="primary"
                                size="small"
                            >
                                Follow
                            </Button>
                        ))}
                </div>
            </div>
            <MembersAndFollowersModal
                list={list!}
                visible={visibleMembersAndFollowersModal}
                title={modalWindowTitle}
                onClose={onCloseModalWindow}
            />
        </div>
    );
};

export default PopperListWindow;
