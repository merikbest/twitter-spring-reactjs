import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import ImageAction from "../ImageAction/ImageAction";
import { ProfileIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TagPeopleModal from "./TagPeopleModal/TagPeopleModal";
import { getUsersInImage } from "../../../../util/text-formatter";
import { selectSelectedUsers } from "../../../../store/ducks/addTweetForm/selector";

const TagPeople: FC = (): ReactElement => {
    const selectedUsers = useSelector(selectSelectedUsers);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ImageAction subtitle={getUsersInImage(selectedUsers)} icon={ProfileIcon} onClick={onOpenModalWindow} />
            <TagPeopleModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default TagPeople;
