import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import Paper from "@material-ui/core/Paper";

import { useGlobalStyles } from "../../../util/globalClasses";
import { useFollowingFollowersStyles } from "../FollowingFollowersStyles";
import BackButton from "../../../components/BackButton/BackButton";
import PageHeaderTitle from "../../../components/PageHeaderTitle/PageHeaderTitle";
import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";

const FollowingFollowersHeader = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useFollowingFollowersStyles();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const fullName = useSelector(selectUserProfileFullName);

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
            {(userProfileId) && (
                <>
                    <BackButton />
                    <PageHeaderTitle title={fullName!} subtitle={`@${username}`} />
                </>
            )}
        </Paper>
    );
});

export default FollowingFollowersHeader;
