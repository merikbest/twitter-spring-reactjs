import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { AddListsIcon } from "../../../../icons";
import { selectUserProfileId, selectUserProfileUsername } from "../../../../store/ducks/userProfile/selectors";
import ListsModal from "../../../../components/ListsModal/ListsModal";
import { useModalWindow } from "../../../../hook/useModalWindow";

const AddUserToListsButton = memo((): ReactElement => {
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ListItem id="openListsModal" onClick={onOpenModalWindow}>
                <>{AddListsIcon}</>
                <Typography component="span">
                    {t("ADD_OR_REMOVE_FROM_LIST", { username, defaultValue: `Add/remove @${username} from Lists` })}
                </Typography>
            </ListItem>
            <ListsModal userId={userProfileId!} visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default AddUserToListsButton;
