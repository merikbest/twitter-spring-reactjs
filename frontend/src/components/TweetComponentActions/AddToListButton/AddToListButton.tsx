import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { AddListsIcon } from "../../../icons";
import ListsModal from "../../ListsModal/ListsModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { selectTweetInfoUserId, selectTweetInfoUserUsername } from "../../../store/ducks/tweetAdditionalInfo/selectors";

const AddToListButton: FC = memo((): ReactElement => {
    const userId = useSelector(selectTweetInfoUserId);
    const username = useSelector(selectTweetInfoUserUsername);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <>
            <ListItem id="openListsModal" onClick={onOpenModalWindow}>
                <>{AddListsIcon}</>
                <Typography variant="body1" component="span">
                    {t("ADD_REMOVE_USER_FROM_LISTS", {
                        username,
                        defaultValue: `Add/remove @${username} from Lists`
                    })}
                </Typography>
            </ListItem>
            <ListsModal userId={userId!} visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default AddToListButton;
