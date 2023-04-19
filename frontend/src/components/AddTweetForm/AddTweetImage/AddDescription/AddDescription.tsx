import React, { FC, ReactElement } from "react";

import ImageAction from "../ImageAction/ImageAction";
import { ListsIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import AddDescriptionModal from "./AddDescriptionModal/AddDescriptionModal";

const AddDescription: FC = (): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ImageAction subtitle={"Add description"} icon={ListsIcon} onClick={onOpenModalWindow} />
            <AddDescriptionModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default AddDescription;
