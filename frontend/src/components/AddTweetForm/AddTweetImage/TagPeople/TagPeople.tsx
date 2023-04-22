import React, { FC, ReactElement } from "react";

import ImageAction from "../ImageAction/ImageAction";
import { ProfileIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TagPeopleModal from "./TagPeopleModal/TagPeopleModal";
import { useSelectUsers } from "../../../../hook/useSelectUsers";

const TagPeople: FC = (): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { selectedUsers, handleDelete, handleListItemClick } = useSelectUsers();
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
