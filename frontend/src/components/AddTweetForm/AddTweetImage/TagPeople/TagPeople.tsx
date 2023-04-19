import React, { FC, ReactElement } from "react";

import ImageAction from "../ImageAction/ImageAction";
import { ProfileIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TagPeopleModal from "./TagPeopleModal/TagPeopleModal";

const TagPeople: FC = (): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ImageAction subtitle={"Tag people"} icon={ProfileIcon} onClick={onOpenModalWindow} />
            <TagPeopleModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default TagPeople;
