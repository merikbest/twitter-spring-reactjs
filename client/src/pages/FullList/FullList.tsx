import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";

import {useFullListStyles} from "./FullListStyles";
import {selectListItem} from "../../store/ducks/list/selectors";
import {fetchListById, followList} from "../../store/ducks/list/actionCreators";
import {BackButton} from "../../components/BackButton/BackButton";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {selectUserData} from "../../store/ducks/user/selectors";

const FullList: FC<RouteComponentProps<{ listId: string }>> = ({match}): ReactElement => {
    const classes = useFullListStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const myProfile = useSelector(selectUserData);

    const [btnText, setBtnText] = useState<string>("Following");

    const follower = list?.followers.find((follower) => follower.id === myProfile?.id);

    // Follow | Unfollow
    const handleFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(followList(list?.id!));
    };

    useEffect(() => {
        dispatch(fetchListById(match.params.listId));
    }, [match.params.listId]);

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
            </Paper>
            <div style={{paddingTop: 53,}}>
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
                    <div className={classes.listOwnerWrapper}>
                        <Avatar
                            className={classes.listOwnerAvatar}
                            src={list?.listOwner.avatar?.src ? list?.listOwner.avatar?.src : DEFAULT_PROFILE_IMG}
                        />
                    </div>
                    <span className={classes.listOwnerFullName}>{list?.listOwner.fullName}</span>
                    <span className={classes.listOwnerUsername}>@{list?.listOwner.username}</span>
                    <div>
                        <span className={classes.listMembers}><b>0</b> Members</span>
                        <span className={classes.listMembers}><b>0</b> Followers</span>
                    </div>
                    <div className={classes.buttonWrapper}>
                        {(myProfile?.id === list?.listOwner.id) ? (
                            <Button
                                className={classes.listOutlinedButton}
                                // onClick={() => handleFollow(user)}
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
                </Paper>
            </div>
        </Paper>
    );
};

export default FullList;
