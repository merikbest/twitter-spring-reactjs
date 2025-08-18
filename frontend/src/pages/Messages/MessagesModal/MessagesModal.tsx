import React, { FC, ReactElement } from "react";
import { Button, Dialog, Divider, List, ListItem } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useMessagesModalStyles } from "./MessagesModalStyles";
import MessagesModalUser from "./MessagesModalUser/MessagesModalUser";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import ModalInput from "../../../components/ModalInput/ModalInput";
import DialogTitleComponent from "../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useMessagesModal } from "./useMessagesModal";

interface MessagesModalProps {
    visible?: boolean;
    onClose: () => void;
}

const MessagesModal: FC<MessagesModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useMessagesModalStyles();
    const { t } = useTranslation();
    const {
        text,
        users,
        usersPagesCount,
        myProfileId,
        selectedUser,
        isNextButtonDisabled,
        handleSubmitSearch,
        onSearch,
        loadParticipants,
        handleClickAddUserToChat,
        handleListItemClick
    } = useMessagesModal(onClose);

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitleComponent
                title={t("NEW_MESSAGE", { defaultValue: "New message" })}
                onClose={onClose}
                borderBottom
            >
                <Button
                    onClick={handleClickAddUserToChat}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={isNextButtonDisabled}
                >
                    {t("NEXT", { defaultValue: "Next" })}
                </Button>
            </DialogTitleComponent>
            <DialogContent id="scrollableDiv" className={classnames(globalClasses.dialogContent, classes.content)}>
                <InfiniteScrollWrapper
                    dataLength={users.length}
                    pagesCount={usersPagesCount}
                    loadItems={loadParticipants}
                >
                    <form onSubmit={handleSubmitSearch}>
                        <ModalInput
                            placeholder={t("SEARCH_PEOPLE", { defaultValue: "Explore people" })}
                            searchText={text}
                            onSearch={onSearch}
                        />
                    </form>
                    <Divider />
                    <List component="nav">
                        {users.map((user) => (
                            <ListItem
                                key={user.id}
                                selected={selectedUser?.id === user.id}
                                disabled={user.isMutedDirectMessages || user.id === myProfileId}
                                onClick={() => handleListItemClick(user)}
                                button
                            >
                                <MessagesModalUser user={user} />
                            </ListItem>
                        ))}
                    </List>
                </InfiniteScrollWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default MessagesModal;
