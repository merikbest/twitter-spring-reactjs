import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import ImageAction from "../ImageAction/ImageAction";
import { ListsIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import AddDescriptionModal from "./AddDescriptionModal/AddDescriptionModal";
import { selectImageDescription } from "../../../../store/ducks/addTweetForm/selector";

const AddDescription: FC = (): ReactElement => {
    const imageDescription = useSelector(selectImageDescription);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ImageAction
                subtitle={(imageDescription === "") ? "Add description" : imageDescription}
                icon={ListsIcon}
                onClick={onOpenModalWindow}
            />
            <AddDescriptionModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default AddDescription;
