import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";

import {useFullListStyles} from "./FullListStyles";
import {selectIsListLoaded, selectIsListLoading, selectListItem,} from "../../store/ducks/list/selectors";
import {fetchListById, resetListState} from "../../store/ducks/list/actionCreators";
import BackButton from "../../components/BackButton/BackButton";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {selectUserData} from "../../store/ducks/user/selectors";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import EditListModal from "./EditListModal/EditListModal";
import MembersAndFollowersModal from "./EditListModal/MembersAndFollowersModal/MembersAndFollowersModal";
import {followList, unfollowList} from "../../store/ducks/lists/actionCreators";
import ShareActionsModal from "./ShareActionsModal/ShareActionsModal";
import TopTweetsActionsModal from "./TopTweetsActionsModal/TopTweetsActionsModal";
import Spinner from "../../components/Spinner/Spinner";
import {LockIcon} from "../../icons";
import {useGlobalStyles} from "../../util/globalClasses";
import InfiniteScroll from "react-infinite-scroll-component";
import {fetchTweetsByListId, resetTweets} from "../../store/ducks/tweets/actionCreators";
import {
    selectIsTweetsLoaded,
    selectIsTweetsLoading,
    selectPagesCount,
    selectTweetsItems
} from "../../store/ducks/tweets/selectors";

const FullList: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useFullListStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const tweets = useSelector(selectTweetsItems);
    const myProfile = useSelector(selectUserData);
    const isListLoading = useSelector(selectIsListLoading);
    const isListLoaded = useSelector(selectIsListLoaded);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const isTweetsLoaded = useSelector(selectIsTweetsLoaded);
    const pagesCount = useSelector(selectPagesCount);
    const params = useParams<{ listId: string }>();

    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleEditListModal, setVisibleEditListModal] = useState<boolean>(false);
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        dispatch(fetchListById(parseInt(params.listId)));
        loadTweets();

        return () => {
            dispatch(resetTweets());
        };
    }, [params.listId]);

    useEffect(() => {
        if (isListLoaded) {
            document.title = `@${list?.listOwner.username}/${list?.name} / Twitter`;
        }
    }, [isListLoaded]);
    
    const handleFollow = (): void => {
        if (list?.isFollower) {
            dispatch(unfollowList(list?.id!));
        } else {
            dispatch(followList(list?.id!));
        }
    };

    const loadTweets = () => {
        dispatch(fetchTweetsByListId({listId: parseInt(params.listId), pageNumber: page}));
        setPage(prevState => prevState + 1);
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
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={globalClasses.pageHeader} variant="outlined">
                    <BackButton/>
                    {!isListLoading && (
                        <div>
                            <div>
                                <Typography variant={"h5"} component={"span"}>
                                    {list?.name}
                                </Typography>
                                {list?.isPrivate && (
                                    <span className={classes.lockIcon}>
                                        {LockIcon}
                                    </span>
                                )}
                            </div>
                            <Typography variant={"subtitle2"} component={"div"}>
                                @{list?.listOwner.username}
                            </Typography>
                        </div>
                    )}
                    <div className={classes.iconGroup}>
                        <ShareActionsModal/>
                        <TopTweetsActionsModal/>
                    </div>
                </Paper>
                <div className={globalClasses.contentWrapper}>
                    {isListLoading ? (
                        <Spinner paddingTop={250}/>
                    ) : (
                        <>
                            <div className={classes.wallpaper}>
                                <img
                                    key={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                    src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                    alt={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                />
                            </div>
                            <Paper className={classes.listInfo} variant="outlined">
                                <div>
                                    <Typography variant={"h5"} component={"span"}>
                                        {list?.name}
                                    </Typography>
                                    {list?.isPrivate && (
                                        <span className={classes.lockIcon}>
                                            {LockIcon}
                                        </span>
                                    )}
                                </div>
                                <Typography variant={"body1"} component={"div"}>
                                    {list?.description}
                                </Typography>
                                <Link to={`/profile/${list?.listOwner.id}`} className={classes.listOwnerLink}>
                                    <div className={classes.listOwnerWrapper}>
                                        <Avatar
                                            className={classes.listOwnerAvatar}
                                            src={list?.listOwner.avatar?.src ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                                        />
                                    </div>
                                    <Typography variant={"h6"} component={"span"}>
                                        {list?.listOwner.fullName}
                                    </Typography>
                                    <Typography variant={"subtitle1"} component={"span"}>
                                        @{list?.listOwner.username}
                                    </Typography>
                                </Link>
                                <div>
                                    <span onClick={onOpenMembersModalWindow} className={classes.listMembers}>
                                        <Typography variant={"h6"} component={"span"}>
                                            {list?.membersSize}
                                        </Typography>
                                        <Typography variant={"subtitle1"} component={"span"}>
                                            {" Members"}
                                        </Typography>
                                    </span>
                                    <span onClick={onOpenFollowersModalWindow} className={classes.listMembers}>
                                        <Typography variant={"h6"} component={"span"}>
                                            {list?.followersSize}
                                        </Typography>
                                        <Typography variant={"subtitle1"} component={"span"}>
                                            {" Followers"}
                                        </Typography>
                                    </span>
                                </div>
                                <div className={classes.buttonWrapper}>
                                    {(myProfile?.id === list?.listOwner.id) ? (
                                        <Button
                                            className={classes.listOutlinedButton}
                                            onClick={onOpenEditListModal}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Edit List
                                        </Button>
                                    ) : (list?.isFollower ? (
                                        <Button
                                            className={classes.primaryButton}
                                            onMouseOver={() => setBtnText("Unfollow")}
                                            onMouseLeave={() => setBtnText("Following")}
                                            onClick={handleFollow}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                        >
                                            {btnText}
                                        </Button>
                                    ) : (
                                        <Button
                                            className={classes.outlinedButton}
                                            onClick={handleFollow}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Follow
                                        </Button>
                                    ))}
                                </div>
                            </Paper>
                        </>
                    )}
                    {(tweets.length === 0 && isTweetsLoaded) ? (
                        <div className={globalClasses.infoText}>
                            <Typography variant={"h4"} component={"div"}>
                                There aren’t any Tweets in this List
                            </Typography>
                            <Typography variant={"subtitle1"} component={"div"}>
                                When anyone in this List Tweets, they’ll show up here.
                            </Typography>
                        </div>
                    ) : (
                        <>
                            {tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                            {isTweetsLoading && <Spinner paddingTop={150}/>}
                        </>
                    )}
                </div>
                {visibleEditListModal && <EditListModal visible={visibleEditListModal} onClose={onCloseCreateListModal}/>}
                <MembersAndFollowersModal
                    list={list!}
                    visible={visibleMembersAndFollowersModal}
                    title={modalWindowTitle}
                    onClose={onCloseModalWindow}
                />
            </Paper>
        </InfiniteScroll>
    );
};

export default FullList;
