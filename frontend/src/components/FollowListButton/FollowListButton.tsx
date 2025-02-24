import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useFollowListButtonStyles } from "./FollowListButtonStyles";
import { followList, unfollowList } from "../../store/ducks/lists/actionCreators";

interface FollowListButtonProps {
    listId: number;
    isFollower: boolean;
}

const FollowListButton: FC<FollowListButtonProps> = ({ listId, isFollower }): ReactElement => {
    const classes = useFollowListButtonStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("FOLLOWING", { defaultValue: "Following" }));

    const onClickFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (isFollower) {
            dispatch(unfollowList(listId));
        } else {
            dispatch(followList(listId));
        }
    };

    return (
        <Button
            className={classes[isFollower ? "listPrimaryButton" : "listOutlinedButton"]}
            onMouseOver={() => setBtnText(t("UNFOLLOW", { defaultValue: "Unfollow" }))}
            onMouseLeave={() => setBtnText(t("FOLLOWING", { defaultValue: "Following" }))}
            onClick={(event) => onClickFollow(event)}
            variant={isFollower ? "contained" : "outlined"}
            color="primary"
            size="small"
        >
            {isFollower ? btnText : t("FOLLOW", { defaultValue: "Follow" })}
        </Button>
    );
};

export default FollowListButton;
