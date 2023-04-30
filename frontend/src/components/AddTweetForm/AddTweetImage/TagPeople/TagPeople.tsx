import React, { FC, ReactElement } from "react";

import ImageAction from "../ImageAction/ImageAction";
import { ProfileIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TagPeopleModal from "./TagPeopleModal/TagPeopleModal";
import { UserResponse } from "../../../../types/user";

interface TagPeopleProps {
    selectedUsers: UserResponse[];
    handleDelete: (selectedUser: UserResponse) => void;
    handleListItemClick: (user: UserResponse) => void;
}

const TagPeople: FC<TagPeopleProps> = (
    {
        selectedUsers,
        handleDelete,
        handleListItemClick
    }
): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const subtitle = (selectedUsers.length === 0)
        ? "Tag people"
        : (selectedUsers.length === 1)
            ? selectedUsers[0].fullName
            : (selectedUsers.length === 2)
                ? `${selectedUsers[0].fullName} and ${selectedUsers[1].fullName}`
                : `${selectedUsers[0].fullName} and ${selectedUsers.length - 1} others`;

    return (
        <>
            <ImageAction subtitle={subtitle} icon={ProfileIcon} onClick={onOpenModalWindow} />
            <TagPeopleModal
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
                selectedUsers={selectedUsers}
                handleDelete={handleDelete}
                handleListItemClick={handleListItemClick}
            />
        </>
    );
};

export default TagPeople;
