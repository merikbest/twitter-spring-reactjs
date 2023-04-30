import React, { FC, ReactElement } from "react";

import ImageAction from "../ImageAction/ImageAction";
import { ListsIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import AddDescriptionModal from "./AddDescriptionModal/AddDescriptionModal";

interface AddDescriptionProps {
    imageSrc: string;
    imageDescription: string;
    handleChangeDescription: (description: string) => void;
}

const AddDescription: FC<AddDescriptionProps> = (
    {
        imageSrc,
        imageDescription,
        handleChangeDescription
    }
): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ImageAction
                subtitle={(imageDescription === "") ? "Add description" : imageDescription}
                icon={ListsIcon}
                onClick={onOpenModalWindow}
            />
            <AddDescriptionModal
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
                imageSrc={imageSrc}
                handleChangeDescription={handleChangeDescription}
            />
        </>
    );
};

export default AddDescription;
