import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Divider, Paper, Switch, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useConversationInfoStyles} from "./ConversationInfoStyles";
import BackButton from "../../../components/BackButton/BackButton";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {ChatParticipant} from "../../../store/ducks/chats/contracts/state";
import {LockIcon} from "../../../icons";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {User} from "../../../store/ducks/user/contracts/state";
import {followUser} from "../../../store/ducks/user/actionCreators";

interface ConversationInfoProps {
    chatParticipant?: ChatParticipant
}

const ConversationInfo: FC<ConversationInfoProps> = ({chatParticipant}): ReactElement => {
    const classes = useConversationInfoStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);

    const follower = myProfile?.followers?.findIndex(follower => follower.id === chatParticipant?.id);

    const handleFollow = (user: ChatParticipant): void => {
        dispatch(followUser(user as User));
    };

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <Paper className={classes.header}>
                    <BackButton/>
                    <Typography variant="h6">
                        Conversation info
                    </Typography>
                </Paper>
                <div className={classes.pageInfoWrapper}>
                    <Avatar
                        className={classes.participantAvatar}
                        src={chatParticipant?.avatar?.src ? chatParticipant?.avatar.src : DEFAULT_PROFILE_IMG}
                    />
                    <div style={{flex: 1}}>
                        <div className={classes.participantInfoWrapper}>
                            <div>
                                <Typography component={"span"} className={classes.fullName}>
                                    {chatParticipant?.fullName}
                                </Typography>
                                {chatParticipant?.privateProfile && (
                                    <span className={classes.lockIcon}>
                                        {LockIcon}
                                    </span>
                                )}
                                <Typography component={"div"} className={classes.username}>
                                    @{chatParticipant?.username}
                                </Typography>
                            </div>
                            <div>
                                {(myProfile?.id !== chatParticipant?.id) && (
                                    (follower === -1) ? (
                                        <Button
                                            className={classes.outlinedButton}
                                            onClick={() => handleFollow(chatParticipant!)}
                                            color="primary"
                                            variant="outlined"
                                        >
                                            Follow
                                        </Button>
                                    ) : (
                                        <Button
                                            className={classes.containedButton}
                                            onMouseOver={() => setBtnText("Unfollow")}
                                            onMouseLeave={() => setBtnText("Following")}
                                            onClick={handleClickOpenUnfollowModal}
                                            color="primary"
                                            variant="contained"
                                        >
                                            {btnText}
                                        </Button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={classes.notificationsInfoWrapper}>
                    <Typography component={"div"} className={classes.title}>
                        Notifications
                    </Typography>
                    <div className={classes.switchWrapper}>
                        <Typography component={"span"} className={classes.text}>
                            Snooze notifications from John Doe
                        </Typography>
                        <Switch checked={false}/>
                    </div>
                </div>
                <Divider/>
                <div className={classNames(classes.conversationInfoButton, classes.blockUser)}>
                    <Typography component={"span"}>
                        Block @{chatParticipant?.username}
                    </Typography>
                </div>
                <div className={classNames(classes.conversationInfoButton, classes.blockUser)}>
                    <Typography component={"span"}>
                        Report @{chatParticipant?.username}
                    </Typography>
                </div>
                <div className={classNames(classes.conversationInfoButton, classes.leaveConversation)}>
                    <Typography component={"span"}>
                        Leave conversation
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};

export default ConversationInfo;
