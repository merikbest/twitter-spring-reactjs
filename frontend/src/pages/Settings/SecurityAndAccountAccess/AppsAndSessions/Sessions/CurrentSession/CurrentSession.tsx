import React, { FC, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { Divider, Typography } from "@material-ui/core";

import { useCurrentSessionStyles } from "./CurrentSessionStyles";
import { DeviceIcon } from "../../../../../../icons";
import { useGlobalStyles } from "../../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../../hoc/withDocumentTitle";

const CurrentSession: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useCurrentSessionStyles();
    const location = useLocation<{ OSName: string; browserName: string; countryName: string; }>();

    return (
        <>
            <div>
                <div className={globalClasses.itemInfoWrapper}>
                    <div className={classes.sessionInfo}>
                        <div className={classes.deviceIconWrapper}>
                            <span className={classes.deviceIcon}>
                                {DeviceIcon}
                            </span>
                        </div>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                {location.state.OSName}
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {location.state.browserName}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Date and time
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Active now
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Location
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {location.state?.countryName}
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(CurrentSession)("Current session");
