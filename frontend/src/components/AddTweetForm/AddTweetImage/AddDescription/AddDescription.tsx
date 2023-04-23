import React, { FC, ReactElement, useState } from "react";

import ImageAction from "../ImageAction/ImageAction";
import { ListsIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import AddDescriptionModal from "./AddDescriptionModal/AddDescriptionModal";

interface AddDescriptionProps {
    imageSrc: string;
}

const AddDescription: FC<AddDescriptionProps> = ({ imageSrc }): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const [description, setDescription] = useState("");

    const handleChangeDescription = (description: string): void => {
        setDescription(description);
    };

    return (
        <>
            <ImageAction
                subtitle={(description === "") ? "Add description" : description}
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
