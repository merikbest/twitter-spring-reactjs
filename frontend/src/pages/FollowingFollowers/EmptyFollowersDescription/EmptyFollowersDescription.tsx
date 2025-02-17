import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useEmptyFollowersDescriptionStyles } from "./EmptyFollowersDescriptionStyles";
import { HOME_CONNECT } from "../../../constants/path-constants";
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
    const { t } = useTranslation();
    const isMyProfile = myProfileId === userProfileId;

    return (
        <div className={classes.content}>
            <Typography variant={"h5"} component={"div"}>
                {(isMyProfile) ? (
                    (activeTab === 0) ? (
                        t("EMPTY_FOLLOWING_TITLE", { defaultValue: "You aren’t following anyone yet" })
                    ) : (
                        t("EMPTY_FOLLOWERS_TITLE", { defaultValue: "You don’t have any followers yet" })
                    )
                ) : (
                    (activeTab === 0) ? (
                        t("EMPTY_USER_FOLLOWING_TITLE", { username, defaultValue: `@${username} isn’t following anyone` })
                    ) : (
                        t("EMPTY_USER_FOLLOWERS_TITLE", { username, defaultValue: `@${username} doesn’t have any followers` })
                    )
                )}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {(isMyProfile) ? (
                    (activeTab === 0) ? (
                        t("EMPTY_FOLLOWING_DESCRIPTION", { defaultValue: "When you do, they’ll be listed here and you’ll see their Tweets in your timeline." })
                    ) : (
                        t("EMPTY_FOLLOWERS_DESCRIPTION", { defaultValue: "When someone follows you, you’ll see them here." })
                    )
                ) : (
                    (activeTab === 0) ? (
                        t("EMPTY_USER_FOLLOWING_DESCRIPTION", { defaultValue: "When they do, they’ll be listed here." })
                    ) : (
                        t("EMPTY_USER_FOLLOWERS_DESCRIPTION", { defaultValue: "When someone follows them, they’ll be listed here." })
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
                    {t("FIND_PEOPLE_TO_FOLLOW", { defaultValue: "Find people to follow" })}
                </Button>
            )}
        </div>
    );
});

export default EmptyFollowersDescription;
