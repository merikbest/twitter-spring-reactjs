import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Avatar, ListItem, Typography } from "@material-ui/core";

import { useTagPeopleItemStyles } from "./TagPeopleItemStyles";
import { UserResponse } from "../../../../../../types/user";
import { DEFAULT_PROFILE_IMG } from "../../../../../../constants/url-constants";
import LockIcon from "../../../../../LockIcon/LockIcon";
import { setSelectedUser } from "../../../../../../store/ducks/addTweetForm/actionCreators";

interface TagPeopleItemProps {
    user: UserResponse;
}

const TagPeopleItem: FC<TagPeopleItemProps> = memo(({ user }): ReactElement => {
    const dispatch = useDispatch();
    const isUserCanTagged = user?.isPrivateProfile && !user.isFollower;
    const classes = useTagPeopleItemStyles({ isUserCanTagged });
    const userAvatar = user?.avatar ?? DEFAULT_PROFILE_IMG;

    const handleListItemClick = (user: UserResponse): void => {
        dispatch(setSelectedUser(user));
    };

    return (
        <ListItem onClick={isUserCanTagged ? undefined : () => handleListItemClick(user)}>
            <div className={classes.container}>
                <Avatar className={classes.listAvatar} src={userAvatar} />
                <div style={{ flex: 1 }}>
                    <div className={classes.header}>
                        <div className={classes.headerInfo}>
                            <div>
                                <Typography variant={"h6"} component={"span"}>
                                    {user?.fullName}
                                </Typography>
                                {user?.isPrivateProfile && <LockIcon />}
                            </div>
                            <Typography variant={"subtitle1"} component={"div"}>
                                @{user?.username}
                                {isUserCanTagged && " can’t be tagged in photos"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </ListItem>
    );
});

export default TagPeopleItem;
