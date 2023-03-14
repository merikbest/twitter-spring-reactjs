import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

import { useEmptyFollowersDescriptionStyles } from "./EmptyFollowersDescriptionStyles";
import { HOME_CONNECT } from "../../../constants/path-constants";
import { useSelector } from "react-redux";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { selectUserProfileId, selectUserProfileUsername } from "../../../store/ducks/userProfile/selectors";

interface EmptyFollowersDescriptionProps {
    activeTab: number;
}

const EmptyFollowersDescription: FC<EmptyFollowersDescriptionProps> = memo(({ activeTab }): ReactElement => {
    const classes = useEmptyFollowersDescriptionStyles();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isMyProfile = myProfileId === userProfileId;

    return (
        <div className={classes.content}>
            <Typography variant={"h5"} component={"div"}>
                {(isMyProfile) ? (
                    (activeTab === 0) ? (
                        "You aren’t following anyone yet"
                    ) : (
                        "You don’t have any followers yet"
                    )
                ) : (
                    (activeTab === 0) ? (
                        `@${username} isn’t following anyone`
                    ) : (
                        `@${username} doesn’t have any followers`
                    )
                )}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {(isMyProfile) ? (
                    (activeTab === 0) ? (
                        "When you do, they’ll be listed here and you’ll see their Tweets in your timeline."
                    ) : (
                        "When someone follows you, you’ll see them here."
                    )
                ) : (
                    (activeTab === 0) ? (
                        "When they do, they’ll be listed here."
                    ) : (
                        "When someone follows them, they’ll be listed here."
                    )
                )}
            </Typography>
            {(isMyProfile && activeTab === 0) && (
                <Button
                    to={HOME_CONNECT}
                    component={Link}
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Find people to follow
                </Button>
            )}
        </div>
    );
});

export default EmptyFollowersDescription;
