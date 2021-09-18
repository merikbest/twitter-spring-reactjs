import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import {Avatar, Button, CircularProgress, IconButton, Paper, Typography} from "@material-ui/core";

import {useFullListStyles} from "./FullListStyles";
import {selectIsListLoading, selectListItem} from "../../store/ducks/list/selectors";
import {fetchListById} from "../../store/ducks/list/actionCreators";
import {BackButton} from "../../components/BackButton/BackButton";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {selectUserData} from "../../store/ducks/user/selectors";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import EditListModal from "./EditListModal/EditListModal";
import MembersAndFollowersModal from "./EditListModal/MembersAndFollowersModal/MembersAndFollowersModal";
import {followList} from "../../store/ducks/lists/actionCreators";
import ShareActionsModal from "./ShareActionsModal/ShareActionsModal";
import TopTweetsActionsModal from "./TopTweetsActionsModal/TopTweetsActionsModal";

const FullList: FC<RouteComponentProps<{ listId: string }>> = ({match}): ReactElement => {
    const classes = useFullListStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectIsListLoading);

    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleEditListModal, setVisibleEditListModal] = useState<boolean>(false);
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    const follower = list?.followers.find((follower) => follower.id === myProfile?.id);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchListById(match.params.listId));
    }, [match.params.listId]);

    // Follow | Unfollow
    const handleFollow = (): void => {
        dispatch(followList(list?.id!));
    };

    const onOpenEditListModal = (): void => {
        setVisibleEditListModal(true);
    };

    const onCloseCreateListModal = (): void => {
        setVisibleEditListModal(false);
    };

    const onOpenMembersModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("List members");
    };

    const onOpenFollowersModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle("List followers");
    };

    const onCloseModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(false);
        setModalWindowTitle("");
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">
                        {list?.name}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        @{list?.listOwner.username}
                    </Typography>
                </div>
                <div className={classes.iconGroup}>
                    <ShareActionsModal/>
                    <TopTweetsActionsModal/>
                </div>
            </Paper>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress/>
                </div>
            ) : (
                <>
                    <div style={{paddingTop: 53}}>
                        <div className={classes.wallpaper}>
                            <img
                                key={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                alt={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                            />
                        </div>
                        <Paper className={classes.listInfo} variant="outlined">
                            <div className={classes.listTitle}>{list?.name}</div>
                            <div className={classes.listDescription}>{list?.description}</div>
                            <Link to={`/user/${list?.listOwner.id}`} className={classes.listOwnerLink}>
                                <div className={classes.listOwnerWrapper}>
                                    <Avatar
                                        className={classes.listOwnerAvatar}
                                        src={list?.listOwner.avatar?.src ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                                    />
                                </div>
                                <span className={classes.listOwnerFullName}>{list?.listOwner.fullName}</span>
                                <span className={classes.listOwnerUsername}>@{list?.listOwner.username}</span>
                            </Link>
                            <div>
                        <span onClick={onOpenMembersModalWindow} className={classes.listMembers}>
                            <b>{list?.members.length}</b> Members
                        </span>
                                <span onClick={onOpenFollowersModalWindow} className={classes.listMembers}>
                            <b>{list?.followers.length}</b> Followers
                        </span>
                            </div>
                            <div className={classes.buttonWrapper}>
                                {(myProfile?.id === list?.listOwner.id) ? (
                                    <Button
                                        className={classes.listOutlinedButton}
                                        onClick={onOpenEditListModal}
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Edit List
                                    </Button>
                                ) : (follower ? (
                                    <Button
                                        className={classes.primaryButton}
                                        onMouseOver={() => setBtnText("Unfollow")}
                                        onMouseLeave={() => setBtnText("Following")}
                                        onClick={handleFollow}
                                        color="primary"
                                        variant="contained"
                                    >
                                        {btnText}
                                    </Button>
                                ) : (
                                    <Button
                                        className={classes.outlinedButton}
                                        onClick={handleFollow}
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Follow
                                    </Button>
                                ))}
                            </div>
                        </Paper>
                        {(list?.tweets.length === 0) ? (
                            <div className={classes.listInfoWrapper}>
                                <div className={classes.listInfoTitle}>There aren’t any Tweets in this List</div>
                                <div className={classes.listInfoText}>When anyone in this List Tweets, they’ll show up
                                    here.
                                </div>
                            </div>
                        ) : (
                            <>
                                {list?.tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                            </>
                        )}
                    </div>
                    {visibleEditListModal && (
                        <EditListModal list={list!} visible={visibleEditListModal} onClose={onCloseCreateListModal}/>
                    )}
                    {visibleMembersAndFollowersModal && (
                        <MembersAndFollowersModal
                            list={list!}
                            users={(modalWindowTitle === "List members") ? list!.members : list!.followers}
                            visible={visibleMembersAndFollowersModal}
                            title={modalWindowTitle}
                            onClose={onCloseModalWindow}
                        />
                    )}
                </>
            )}
        </Paper>
    );
};

export default FullList;
