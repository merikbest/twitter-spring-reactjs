import React, {FC, memo, ReactElement, useState} from "react";
import {ListItem, Typography} from "@material-ui/core";

import {AddListsIcon} from "../../../icons";
import ListsModal from "../../ListsModal/ListsModal";

interface AddToListButtonProps {
    userId: number;
    username: string;
}

const AddToListButton: FC<AddToListButtonProps> = memo(({userId, username}): ReactElement => {
    const [visibleListsModal, setVisibleListsModal] = useState<boolean>(false);

    const onOpenListsModal = (): void => {
        setVisibleListsModal(true);
    };

    const onCloseListsModal = (): void => {
        setVisibleListsModal(false);
    };

    return (
        <>
            <ListItem id={"openListsModal"} onClick={onOpenListsModal}>
                <>{AddListsIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {`Add/remove @${username} from Lists`}
                </Typography>
            </ListItem>
            <ListsModal userId={userId} visible={visibleListsModal} onClose={onCloseListsModal}/>
        </>
    );
});

export default AddToListButton;
