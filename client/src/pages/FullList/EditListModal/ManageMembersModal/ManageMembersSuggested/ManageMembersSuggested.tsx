import React, {FC, FormEvent, ReactElement, useState} from 'react';
import {InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import {useManageMembersSuggestedStyles} from "./ManageMembersSuggestedStyles";
import {ManageMembersInput} from "./ManageMembersInput/ManageMembersInput";
import {User} from "../../../../../store/ducks/user/contracts/state";
import {UserApi} from "../../../../../services/api/userApi";
import ManageMembersItem from "../ManageMembersItem/ManageMembersItem";
import {Lists} from "../../../../../store/ducks/lists/contracts/state";

interface ManageMembersSuggestedProps {
    list: Lists;
}

const ManageMembersSuggested: FC<ManageMembersSuggestedProps> = ({list}): ReactElement => {
    const classes = useManageMembersSuggestedStyles();

    const [text, setText] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    const handleClickSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        UserApi.searchUsersByUsername(encodeURIComponent(text))
            .then((response) => setUsers(response!));
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleClickSearch}>
                <ManageMembersInput
                    fullWidth
                    placeholder="Search people"
                    variant="outlined"
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
            {(users.length !== 0) ? (
                <>
                    {users.map((user) => (<ManageMembersItem item={list} member={user}/>))}
                </>
            ) : (
                <div className={classes.suggestedInfoWrapper}>
                    <div className={classes.suggestedTitle}>
                        There aren’t any suggested members
                    </div>
                    <div className={classes.suggestedText}>
                        To see suggestions to add to this List, try searching for accounts.
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMembersSuggested;
