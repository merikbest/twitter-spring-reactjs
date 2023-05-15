import React, { ReactElement } from "react";
import { Dialog, DialogContent, Divider } from "@material-ui/core";

import { useGlobalStyles } from "../../../util/globalClasses";
import { SettingsIcon } from "../../../icons";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { useModalWindow } from "../../../hook/useModalWindow";
import SettingsModalItem from "./SettingsModalItem/SettingsModalItem";
import DialogTitleComponent from "../../DialogTitleComponent/DialogTitleComponent";

const SettingsModal = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ActionIconButton actionText={"Settings"} onClick={onOpenModalWindow} icon={SettingsIcon} />
            <Dialog open={visibleModalWindow} onClose={onCloseModalWindow}>
                <DialogTitleComponent title={"Trends"} onClose={onCloseModalWindow} />
                <DialogContent className={globalClasses.dialogContent}>
                    <SettingsModalItem
                        title={"Location"}
                        subtitle={"Show content in this location"}
                        text={"When this is on, you’ll see what’s happening around you right now."}
                    />
                    <Divider />
                    <SettingsModalItem
                        title={"Personalization"}
                        subtitle={"Trends for you"}
                        text={"You can personalize trends based on your location and who you follow."}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SettingsModal;
