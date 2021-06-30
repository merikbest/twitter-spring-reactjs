import React, {FC, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, Typography} from "@material-ui/core";

import {User} from "../../store/ducks/user/contracts/state";
import {useStylesFollower} from "./FollowerStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

interface FollowerProps {
    user: User
}

const Follower: FC<FollowerProps> = ({user}) => {
    const classes = useStylesFollower();
    const history = useHistory();
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const onClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        if (!visibleUnfollowModal) {
            history.push(`/user/${user.id}`);
        }
    };

    return (
        <Paper className={classes.follower} variant="outlined">
            <Link to={`/user/${user.id}`} className={classes.followerLink}>
                <Avatar className={classes.followerAvatar} src={user?.avatar?.src ? user?.avatar.src :
                    "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}/>
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.followerWrapper}>
                    <Link to={`/user/${user.id}`} className={classes.followerLink}>
                        <div style={{width: 350}}>
                            <Typography className={classes.followerFullName}>
                                {user?.fullName}
                            </Typography>
                            <Typography className={classes.followerUsername} variant="caption" display="block" gutterBottom>
                                @{user?.username}
                            </Typography>
                        </div>
                    </Link>
                    <div>
                        <Button
                            className={classes.followerBtn}
                            onMouseOver={() => setBtnText("Unfollow")}
                            onMouseLeave={() => setBtnText("Following")}
                            onClick={handleClickOpenUnfollowModal}
                            variant="contained"
                            color="primary">
                            {btnText}
                        </Button>
                    </div>
                </div>
                <Typography display="block">{user?.about}</Typography>
                <Dialog open={visibleUnfollowModal} onClose={onCloseUnfollowModal} aria-labelledby="form-dialog-title">
                    <DialogContent style={{padding: "0px 0px"}}>
                        <div style={{width: 280, height: 176, textAlign: "center", margin: "32px 20px"}}>
                            <Typography className={classes.followerFullName}>
                                Unfollow {user?.fullName} ?
                            </Typography>
                            <Typography className={classes.followerUsername} variant="caption" display="block" gutterBottom>
                                Their Tweets will no longer show up in your home timeline. You can still view their
                                profile, unless their Tweets are protected.
                            </Typography>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </Paper>
    );
};

export default Follower;
