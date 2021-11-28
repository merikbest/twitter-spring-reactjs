import React, {FC, ReactElement} from 'react';
import {useLocation} from "react-router-dom";
import {Divider, Typography} from "@material-ui/core";

import {useCurrentSessionStyles} from "./CurrentSessionStyles";
import {DeviceIcon} from "../../../../../../icons";

const CurrentSession: FC = (): ReactElement => {
    const classes = useCurrentSessionStyles();
    const location = useLocation<{ OSName: string; browserName: string; countryName: string; }>();

    return (
        <>
            <div>
                <div className={classes.infoItemWrapper}>
                    <div className={classes.sessionInfo}>
                        <div className={classes.deviceIconWrapper}>
                            <span className={classes.deviceIcon}>
                                {DeviceIcon}
                            </span>
                        </div>
                        <div>
                            <Typography component={"div"} className={classes.OSTypeText}>
                                {location.state.OSName}
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                {location.state.browserName}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Date and time
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Active now
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Location
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    {location.state?.countryName}
                </Typography>
            </div>
        </>
    );
};

export default CurrentSession;
