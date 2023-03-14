import React, { FC, ReactElement, useState } from "react";
import classnames from "classnames";
import { Button } from "@material-ui/core";

import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface ButtonButtonProps {
    onBlockUser: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BlockButton: FC<ButtonButtonProps> = ({ onBlockUser }): ReactElement => {
    const classes = useConversationInfoStyles();
    const [btnText, setBtnText] = useState<string>("Blocked");

    return (
        <Button
            onClick={onBlockUser}
            className={classnames(classes.containedButton, classes.blockButton)}
            onMouseOver={() => setBtnText("Unblock")}
            onMouseLeave={() => setBtnText("Blocked")}
            color="primary"
            variant="contained"
        >
            {btnText}
        </Button>
    );
};

export default BlockButton;
