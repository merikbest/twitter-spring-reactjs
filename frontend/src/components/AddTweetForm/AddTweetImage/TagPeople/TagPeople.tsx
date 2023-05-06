import React, { FC, ReactElement } from "react";

import ImageAction from "../ImageAction/ImageAction";
import { ProfileIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TagPeopleModal from "./TagPeopleModal/TagPeopleModal";
import { UserResponse } from "../../../../types/user";
import { getUsersInImage } from "../../../../util/text-formatter";

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

    return (
        <>
            <ImageAction subtitle={getUsersInImage(selectedUsers)} icon={ProfileIcon} onClick={onOpenModalWindow} />
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
