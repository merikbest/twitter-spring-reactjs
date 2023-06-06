import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import ImageAction from "../ImageAction/ImageAction";
import { ListsIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import AddDescriptionModal from "./AddDescriptionModal/AddDescriptionModal";
import { selectImageDescription } from "../../../../store/ducks/addTweetForm/selector";

interface AddDescriptionProps {
    imageSrc: string;
}

const AddDescription: FC<AddDescriptionProps> = ({ imageSrc }): ReactElement => {
    const imageDescription = useSelector(selectImageDescription);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ImageAction
                subtitle={(imageDescription === "") ? "Add description" : imageDescription}
                icon={ListsIcon}
                onClick={onOpenModalWindow}
            />
            <AddDescriptionModal visible={visibleModalWindow} onClose={onCloseModalWindow} imageSrc={imageSrc} />
        </>
    );
};

export default AddDescription;
