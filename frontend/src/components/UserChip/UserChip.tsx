import React, { FC, memo, ReactElement } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar, Chip } from "@material-ui/core";

import { useUserChipStyles } from "./UserChipStyles";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import { UserResponse } from "../../types/user";

interface UserChipProps {
    selectedUser: UserResponse;
    onDeleteUser: (selectedUser: UserResponse) => void;
}

const UserChip: FC<UserChipProps> = memo(({ selectedUser, onDeleteUser }): ReactElement => {
    const classes = useUserChipStyles();

    return (
        <Chip
            key={selectedUser.id}
            className={classes.chip}
            avatar={<Avatar alt={selectedUser?.fullName} src={selectedUser?.avatar ?? DEFAULT_PROFILE_IMG} />}
            label={selectedUser?.fullName}
            deleteIcon={<CloseIcon color="primary" />}
            onDelete={() => onDeleteUser(selectedUser)}
        />
    );
});

export default UserChip;
