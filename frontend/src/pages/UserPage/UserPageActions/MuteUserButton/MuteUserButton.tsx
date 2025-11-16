import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { MuteIcon, UnmuteIcon } from "../../../../icons";
import { useMuteUserButton } from "./useMuteUserButton";

interface MuteUserButtonProps {
    onCloseUserPageActions: () => void;
}

const MuteUserButton: FC<MuteUserButtonProps> = memo(({ onCloseUserPageActions }): ReactElement => {
    const { isUserMuted, username, handleMuteUser } = useMuteUserButton(onCloseUserPageActions);
    const { t } = useTranslation();

    return (
        <ListItem id="handleMuteUser" onClick={handleMuteUser}>
            <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
            <Typography component="span">
                {isUserMuted
                    ? t("UNMUTE_USER", { username, defaultValue: `Unmute @${username}` })
                    : t("MUTE_USER", { username, defaultValue: `Mute @${username}` })}
            </Typography>
        </ListItem>
    );
});

export default MuteUserButton;
