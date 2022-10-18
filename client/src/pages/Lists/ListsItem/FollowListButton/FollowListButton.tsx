import React, {FC, ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";

import {useFollowListButtonStyles} from "./FollowListButtonStyles";
import {followList, unfollowList} from "../../../../store/ducks/lists/actionCreators";
import {ListResponse} from "../../../../store/types/lists";

interface FollowListButtonProps {
    list: ListResponse;
}

const FollowListButton: FC<FollowListButtonProps> = ({list}): ReactElement => {
    const classes = useFollowListButtonStyles();
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState<string>("Following");

    const onClickFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (list.isFollower) {
            dispatch(unfollowList(list?.id!));
        } else {
            dispatch(followList(list?.id!));
        }
    };

    return (
        <Button
            className={classes[list.isFollower ? "listPrimaryButton" : "listOutlinedButton"]}
            onMouseOver={() => setBtnText("Unfollow")}
            onMouseLeave={() => setBtnText("Following")}
            onClick={(event) => onClickFollow(event)}
            variant={list.isFollower ? "contained" : "outlined"}
            color="primary"
            size="small"
        >
            {list.isFollower ? btnText : "Follow"}
        </Button>
    );
};

export default FollowListButton;
