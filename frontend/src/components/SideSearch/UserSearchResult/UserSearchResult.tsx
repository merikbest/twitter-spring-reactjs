import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";

import { useUserSearchResultStyles } from "./UserSearchResultStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import { CommonUserResponse } from "../../../types/user";
import { PROFILE } from "../../../constants/path-constants";
import { addToLocalStorage } from "../addToLocalStorage";
import RemoveSearchResultButton from "../RemoveSearchResultButton/RemoveSearchResultButton";

interface UserSearchResultProps {
    user: CommonUserResponse;
    recentSearch?: boolean;
}

const UserSearchResult: FC<UserSearchResultProps> = ({ user, recentSearch }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserSearchResultStyles();
    const history = useHistory();

    const handleClickUserProfile = (): void => {
        addToLocalStorage("users", user.id);
        history.push(`${PROFILE}/${user.id}`);
    };

    return (
        <ListItem className={classes.searchPersonResult} onClick={handleClickUserProfile}>
            <ListItemAvatar>
                <Avatar className={globalClasses.avatar} alt={"avatar"} src={user.avatar} />
            </ListItemAvatar>
            <div className={classes.userInfo}>
                <Typography variant={"h6"} display={"inline"}>
                    {user.fullName}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    @{user.username}
                </Typography>
            </div>
            {recentSearch && <RemoveSearchResultButton stateItem={"users"} item={user.id} />}
        </ListItem>
    );
};

export default UserSearchResult;
