import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";

import { useUserSearchResultStyles } from "./UserSearchResultStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import { CommonUserResponse } from "../../../types/user";
import { PROFILE } from "../../../constants/path-constants";

interface UserSearchResultProps {
    user: CommonUserResponse;
}

const UserSearchResult: FC<UserSearchResultProps> = ({ user }): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserSearchResultStyles();

    return (
        <Link to={`${PROFILE}/${user.id}`} className={globalClasses.link}>
            <ListItem className={classes.searchPersonResult}>
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
            </ListItem>
        </Link>
    );
};

export default UserSearchResult;
