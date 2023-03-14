import React, { memo, ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { AddListsIcon } from "../../../../icons";
import { selectUserProfileId, selectUserProfileUsername } from "../../../../store/ducks/userProfile/selectors";
import ListsModal from "../../../../components/ListsModal/ListsModal";

const AddUserToListsButton = memo((): ReactElement => {
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
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
                <Typography component={"span"}>
                    Add/remove @{username} from Lists
                </Typography>
            </ListItem>
            <ListsModal userId={userProfileId!} visible={visibleListsModal} onClose={onCloseListsModal} />
        </>
    );
});

export default AddUserToListsButton;
