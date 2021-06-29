import React, {FC} from 'react';
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, Typography} from "@material-ui/core";

import {User} from "../../store/ducks/user/contracts/state";
import {useStylesFollower} from "./FollowerStyles";

interface FollowerProps {
    user: User
}

const Follower: FC<FollowerProps> = ({user}) => {
    const classes = useStylesFollower();

    return (
        <Paper className={classes.follower} variant="outlined">
            <Avatar className={classes.followerAvatar} src={user?.avatar?.src ? user?.avatar.src :
                "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}/>
            <div style={{flex: 1}}>
                <div className={classes.followerWrapper}>
                    <div>
                        <Typography className={classes.followerFullName}>
                            {user?.fullName}
                        </Typography>
                        <Typography className={classes.followerUsername} variant="caption" display="block" gutterBottom>
                            @{user?.username}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" className={classes.followerBtn}>Following</Button>
                    </div>
                </div>
                <Typography display="block">{user?.about}</Typography>
            </div>
        </Paper>
    );
};

export default Follower;
