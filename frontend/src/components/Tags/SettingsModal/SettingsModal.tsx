import React, { ReactElement } from "react";
import { Dialog, DialogContent, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../util/globalClasses";
import { SettingsIcon } from "../../../icons";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { useModalWindow } from "../../../hook/useModalWindow";
import SettingsModalItem from "./SettingsModalItem/SettingsModalItem";
import DialogTitleComponent from "../../DialogTitleComponent/DialogTitleComponent";

const SettingsModal = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <>
            <ActionIconButton
                actionText={t("SETTINGS", { defaultValue: "Settings" })}
                onClick={onOpenModalWindow}
                icon={SettingsIcon}
            />
            <Dialog open={visibleModalWindow} onClose={onCloseModalWindow}>
                <DialogTitleComponent title={t("TRENDS", { defaultValue: "Trends" })} onClose={onCloseModalWindow} />
                <DialogContent className={globalClasses.dialogContent}>
                    <SettingsModalItem
                        title={t("LOCATION", { defaultValue: "Location" })}
                        subtitle={t("LOCATION_SUBTITLE", { defaultValue: "Show content in this location" })}
                        text={t("LOCATION_DESCRIPTION", { defaultValue: "When this is on, you’ll see what’s happening around you right now." })}
                    />
                    <Divider />
                    <SettingsModalItem
                        title={t("PERSONALIZATION", { defaultValue: "Personalization" })}
                        subtitle={t("PERSONALIZATION_SUBTITLE", { defaultValue: "Trends for you" })}
                        text={t("PERSONALIZATION_DESCRIPTION", { defaultValue: "You can personalize trends based on your location and who you follow." })}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SettingsModal;
