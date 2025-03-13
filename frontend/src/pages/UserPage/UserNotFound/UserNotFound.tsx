import React, { FC, ReactElement } from "react";
import { Avatar, Paper, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useUserNotFoundStyles } from "./UserNotFoundStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";

const UserNotFound: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserNotFoundStyles();
    const { t } = useTranslation();

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
            <PageHeaderWrapper backButton>
                <Typography variant="h5" component="span">
                    {t("PROFILE", { defaultValue: "Profile" })}
                </Typography>
            </PageHeaderWrapper>
            <div className={classes.wallpaper} />
            <div className={classes.avatar}>
                <Avatar>
                    <div></div>
                </Avatar>
            </div>
            <div className={classes.info}>
                <Typography variant="h4" component="div">
                    {t("THIS_ACCOUNT_DOESNT_EXIST", { defaultValue: "This account doesn’t exist" })}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {t("TRY_SEARCHING_FOR_ANOTHER", { defaultValue: "Try searching for another." })}
                </Typography>
            </div>
        </Paper>
    );
};

export default UserNotFound;
