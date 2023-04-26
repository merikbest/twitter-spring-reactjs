import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { AddListsIcon } from "../../../icons";
import ListsModal from "../../ListsModal/ListsModal";
import { useModalWindow } from "../../../hook/useModalWindow";

interface AddToListButtonProps {
    userId: number;
    username: string;
}

const AddToListButton: FC<AddToListButtonProps> = memo(({ userId, username }): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ListItem id={"openListsModal"} onClick={onOpenModalWindow}>
                <>{AddListsIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {`Add/remove @${username} from Lists`}
                </Typography>
            </ListItem>
            <ListsModal userId={userId} visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default AddToListButton;
