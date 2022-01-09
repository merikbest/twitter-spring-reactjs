import React, {FC, ReactElement} from 'react';
import {Avatar, Paper, Typography} from "@material-ui/core";

import {useUserNotFoundStyles} from "./UserNotFoundStyles";
import BackButton from "../../../components/BackButton/BackButton";

const UserNotFound: FC = (): ReactElement => {
    const classes = useUserNotFoundStyles();

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <Typography component={"span"} className={classes.headerTitle}>
                    Profile
                </Typography>
            </Paper>
            <div className={classes.wallpaper}/>
            <div className={classes.avatar}>
                <Avatar>
                    <div></div>
                </Avatar>
            </div>
            <div className={classes.info}>
                <Typography variant={"h4"} component={"div"}>
                    This account doesn’t exist
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    Try searching for another.
                </Typography>
            </div>
        </Paper>
    );
};

export default UserNotFound;
