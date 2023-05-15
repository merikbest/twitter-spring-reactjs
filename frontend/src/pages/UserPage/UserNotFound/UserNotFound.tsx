import React, { FC, ReactElement } from "react";
import { Avatar, Paper, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useUserNotFoundStyles } from "./UserNotFoundStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";

const UserNotFound: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserNotFoundStyles();

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
            <PageHeaderWrapper backButton>
                <Typography variant={"h5"} component={"span"}>
                    Profile
                </Typography>
            </PageHeaderWrapper>
            <div className={classes.wallpaper} />
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
