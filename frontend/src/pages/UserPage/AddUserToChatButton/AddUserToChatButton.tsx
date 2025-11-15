import React, { memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { MessagesIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useAddUserToChatButton } from "./useAddUserToChatButton";

const AddUserToChatButton = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();
    const { handleClickAddUserToChat } = useAddUserToChatButton();

    return (
        <span className={globalClasses.userPageIconButton}>
            <ActionIconButton
                actionText={t("MESSAGE", { defaultValue: "Message" })}
                icon={MessagesIcon}
                onClick={handleClickAddUserToChat}
            />
        </span>
    );
});

export default AddUserToChatButton;
