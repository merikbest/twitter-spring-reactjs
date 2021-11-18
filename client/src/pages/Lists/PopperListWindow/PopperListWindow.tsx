import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Button} from "@material-ui/core";

import {Lists} from "../../../store/ducks/lists/contracts/state";
import {usePopperListWindowStyles} from "./PopperListWindowStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {followList, unfollowList} from "../../../store/ducks/lists/actionCreators";
import MembersAndFollowersModal from "../../FullList/EditListModal/MembersAndFollowersModal/MembersAndFollowersModal";

interface PopperListWindowProps {
    list: Lists;
    visible: boolean;
}

const PopperListWindow: FC<PopperListWindowProps> = ({list, visible}): ReactElement | null => {
    const classes = usePopperListWindowStyles();
    const myProfile = useSelector(selectUserData);
    const dispatch = useDispatch();

    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    const follower = list?.followers.find((follower) => follower.id === myProfile?.id);

    // Follow | Unfollow
    const handleFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (follower) {
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
                <div className={classes.popperListTitle}>
                    {list?.name}
                </div>
                <div className={classes.popperListDescription}>
                    {list?.description}
                </div>
                <Link to={`/user/${list?.listOwner.id}`} className={classes.popperListOwnerLink}>
                    <div className={classes.popperListOwnerWrapper}>
                        <Avatar
                            className={classes.popperListOwnerAvatar}
                            src={list?.listOwner.avatar?.src ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                        />
                    </div>
                    <span className={classes.popperListOwnerFullName}>
                        {list?.listOwner.fullName}
                    </span>
                    <span className={classes.popperListOwnerUsername}>
                        @{list?.listOwner.username}
                    </span>
                </Link>
                <div>
                    <span onClick={event => onOpenMembersModalWindow(event)} className={classes.popperListMembers}>
                        <b>{list?.members.length}</b> Members
                    </span>
                    <span onClick={event => onOpenFollowersModalWindow(event)} className={classes.popperListMembers}>
                        <b>{list?.followers.length}</b> Followers
                    </span>
                </div>
                <div className={classes.buttonWrapper}>
                    {(myProfile?.id === list?.listOwner.id) ? null :
                        (follower ? (
                            <Button
                                className={classes.primaryButton}
                                onMouseOver={() => setBtnText("Unfollow")}
                                onMouseLeave={() => setBtnText("Following")}
                                onClick={event => handleFollow(event)}
                                color="primary"
                                variant="contained"
                            >
                                {btnText}
                            </Button>
                        ) : (
                            <Button
                                className={classes.outlinedButton}
                                onClick={event => handleFollow(event)}
                                color="primary"
                                variant="outlined"
                            >
                                Follow
                            </Button>
                        ))}
                </div>
            </div>
            <MembersAndFollowersModal
                visible={visibleMembersAndFollowersModal}
                title={modalWindowTitle}
                onClose={onCloseModalWindow}
            />
        </div>
    );
};

export default PopperListWindow;
