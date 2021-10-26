import React, {FC, ReactElement} from 'react';
import {Paper, Typography} from "@material-ui/core";

import {useTweetDeckTeamsStyles} from "./TweetDeckTeamsStyles";

const TweetDeckTeams: FC = (): ReactElement => {
    const classes = useTweetDeckTeamsStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.text}>
                            Invite anyone to Tweet from this account using the Teams feature in TweetDeck.
                        </Typography>
                    </div>
                    <div className={classes.infoItemWrapper}>

                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default TweetDeckTeams;
