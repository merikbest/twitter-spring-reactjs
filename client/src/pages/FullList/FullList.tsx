import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {Avatar, Paper, Typography} from "@material-ui/core";

import {useFullListStyles} from "./FullListStyles";
import {selectIsListLoaded, selectIsListLoading, selectListItem,} from "../../store/ducks/list/selectors";
import {fetchListById} from "../../store/ducks/list/actionCreators";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {selectUserData} from "../../store/ducks/user/selectors";
import ShareActionsModal from "./ShareActionsModal/ShareActionsModal";
import TopTweetsActionsModal from "./TopTweetsActionsModal/TopTweetsActionsModal";
import Spinner from "../../components/Spinner/Spinner";
import {LockIcon} from "../../icons";
import {useGlobalStyles} from "../../util/globalClasses";
import {PROFILE} from "../../util/pathConstants";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import FollowListButton from "../../components/FollowListButton/FollowListButton";
import FullListTweets from "./FullListTweets/FullListTweets";
import MembersAndFollowers from "./MembersAndFollowers/MembersAndFollowers";
import EditListButton from "./EditListButton/EditListButton";

const FullList: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useFullListStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const myProfile = useSelector(selectUserData);
    const isListLoading = useSelector(selectIsListLoading);
    const isListLoaded = useSelector(selectIsListLoaded);
    const params = useParams<{ listId: string }>();
    const listWallpaper = list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper;

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchListById(parseInt(params.listId)));
    }, [params.listId]);

    useEffect(() => {
        if (isListLoaded) {
            document.title = `@${list?.listOwner.username}/${list?.name} / Twitter`;
        }
    }, [isListLoaded]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper backButton>
                {!isListLoading && (
                    <div>
                        <div>
                            <Typography variant={"h5"} component={"span"}>
                                {list?.name}
                            </Typography>
                            {list?.isPrivate && <span className={classes.lockIcon}>{LockIcon}</span>}
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
            </PageHeaderWrapper>
            <div className={globalClasses.contentWrapper}>
                {isListLoading ? (
                    <Spinner paddingTop={250}/>
                ) : (
                    <>
                        <div className={classes.wallpaper}>
                            <img key={listWallpaper} src={listWallpaper} alt={listWallpaper}/>
                        </div>
                        <Paper className={classes.listInfo} variant="outlined">
                            <div>
                                <Typography variant={"h5"} component={"span"}>
                                    {list?.name}
                                </Typography>
                                {list?.isPrivate && <span className={classes.lockIcon}>{LockIcon}</span>}
                            </div>
                            <Typography variant={"body1"} component={"div"}>
                                {list?.description}
                            </Typography>
                            <Link to={`${PROFILE}/${list?.listOwner.id}`} className={classes.listOwnerLink}>
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
                            <MembersAndFollowers/>
                            <div className={classes.buttonWrapper}>
                                {(myProfile?.id === list?.listOwner.id) ? (
                                    <EditListButton/>
                                ) : (
                                    <FollowListButton listId={list!.id} isFollower={list!.isFollower}/>
                                )}
                            </div>
                        </Paper>
                    </>
                )}
                <FullListTweets/>
            </div>
        </Paper>
    );
};

export default FullList;
