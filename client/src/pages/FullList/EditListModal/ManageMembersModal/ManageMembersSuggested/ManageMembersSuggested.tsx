import React, {FC, ReactElement, useState} from 'react';
import {useSelector} from "react-redux";
import {InputAdornment, Typography} from "@material-ui/core";

import {useManageMembersSuggestedStyles} from "./ManageMembersSuggestedStyles";
import {ManageMembersInput} from "./ManageMembersInput/ManageMembersInput";
import {User} from "../../../../../store/ducks/user/contracts/state";
import {UserApi} from "../../../../../services/api/userApi";
import ManageMembersItem from "../ManageMembersItem/ManageMembersItem";
import {SearchIcon} from "../../../../../icons";
import {selectListItem} from "../../../../../store/ducks/list/selectors";

const ManageMembersSuggested: FC = (): ReactElement => {
    const classes = useManageMembersSuggestedStyles();
    const list = useSelector(selectListItem);
    const [searchText, setSearchText] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            UserApi.searchUsersByUsername(encodeURIComponent(text))
                .then((response) => setUsers(response!));
        } else {
            setSearchText("");
            setUsers([]);
        }
    };

    return (
        <div className={classes.container}>
            <ManageMembersInput
                fullWidth
                placeholder="Search people"
                variant="outlined"
                onChange={(event) => onSearch(event.target.value)}
                value={searchText}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {SearchIcon}
                        </InputAdornment>
                    ),
                }}
            />
            {(users.length !== 0) ? (
                <>
                    {users.map((user) => (<ManageMembersItem key={user.id} item={list} member={user}/>))}
                </>
            ) : (
                <div className={classes.suggestedInfoWrapper}>
                    <Typography className={classes.suggestedTitle}>
                        There aren’t any suggested members
                    </Typography>
                    <Typography className={classes.suggestedText}>
                        To see suggestions to add to this List, try searching for accounts.
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ManageMembersSuggested;
