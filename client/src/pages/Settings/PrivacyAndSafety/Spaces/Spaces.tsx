import React, {FC, ReactElement} from 'react';
import {Switch, Typography} from "@material-ui/core";

import {useSpacesStyles} from "./SpacesStyles";

const Spaces: FC = (): ReactElement => {
    const classes = useSpacesStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage who can see your Spaces listening activity
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Allow followers to see which Spaces you’re listening to
                    <span className={classes.switch}>
                        <Switch defaultChecked/>
                    </span>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Keep in mind that even with this setting turned off you will be visible to everyone when you’re in a
                    Space. Your followers can always see what Spaces you’re hosting, co-hosting or speaking in. <a
                    href={"https://help.twitter.com/using-twitter/spaces"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default Spaces;
