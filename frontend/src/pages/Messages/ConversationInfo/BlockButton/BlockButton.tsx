import React, { FC, ReactElement, useState } from "react";
import classnames from "classnames";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface ButtonButtonProps {
    onBlockUser: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BlockButton: FC<ButtonButtonProps> = ({ onBlockUser }): ReactElement => {
    const { t } = useTranslation();
    const classes = useConversationInfoStyles();
    const [btnText, setBtnText] = useState<string>(t("BLOCKED", { defaultValue: "Blocked" }));

    return (
        <Button
            onClick={onBlockUser}
            className={classnames(classes.containedButton, classes.blockButton)}
            onMouseOver={() => setBtnText(t("UNBLOCK", { defaultValue: "Unblock" }))}
            onMouseLeave={() => setBtnText(t("BLOCKED", { defaultValue: "Blocked" }))}
            color="primary"
            variant="contained"
        >
            {btnText}
        </Button>
    );
};

export default BlockButton;
