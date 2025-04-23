import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ReplyIcon } from "../../../icons";

interface ChangeReplyButton {
    handleClickReplyDropdown: () => void;
}

const ChangeReplyButton: FC<ChangeReplyButton> = memo(({ handleClickReplyDropdown }): ReactElement => {
    const { t } = useTranslation();

    return (
        <ListItem id="clickReplyDropdown" onClick={handleClickReplyDropdown}>
            <>{ReplyIcon}</>
            <Typography variant="body1" component="span">
                {t("CHANGE_WHO_CAN_REPLY", { defaultValue: "Change who can reply" })}
            </Typography>
        </ListItem>
    );
});

export default ChangeReplyButton;
