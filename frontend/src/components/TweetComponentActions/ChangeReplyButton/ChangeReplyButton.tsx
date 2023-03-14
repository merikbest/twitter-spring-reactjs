import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { ReplyIcon } from "../../../icons";

interface ChangeReplyButton {
    handleClickReplyDropdown: () => void;
}

const ChangeReplyButton: FC<ChangeReplyButton> = memo(({ handleClickReplyDropdown }): ReactElement => {

    return (
        <ListItem id={"clickReplyDropdown"} onClick={handleClickReplyDropdown}>
            <>{ReplyIcon}</>
            <Typography variant={"body1"} component={"span"}>
                Change who can reply
            </Typography>
        </ListItem>
    );
});

export default ChangeReplyButton;
