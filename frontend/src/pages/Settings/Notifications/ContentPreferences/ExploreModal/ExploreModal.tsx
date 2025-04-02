import React, { FC, ReactElement } from "react";
import { Dialog, DialogContent, Link as MuiLink } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { TWITTER_SEARCH } from "../../../../../constants/url-constants";
import ExploreModalInfo from "./ExploreModalInfo/ExploreModalInfo";
import DialogTitleComponent from "../../../../../components/DialogTitleComponent/DialogTitleComponent";

export interface ExploreModalProps {
    visible?: boolean;
    onClose: () => void;
    isSearchModal: boolean;
}

const ExploreModal: FC<ExploreModalProps> = ({ visible, onClose, isSearchModal }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitleComponent
                title={isSearchModal
                    ? t("SEARCH_SETTINGS", { defaultValue: "Search settings" })
                    : t("EXPLORE_SETTINGS", { defaultValue: "Explore settings" })}
                onClose={onClose}
            />
            <DialogContent className={globalClasses.dialogContent}>
                <ExploreModalInfo
                    isSearchModal={isSearchModal}
                    searchModalTitle={t("LOCATION", { defaultValue: "Location" })}
                    title={isSearchModal
                        ? t("HIDE_SENSITIVE_CONTENT", { defaultValue: "Hide sensitive content" })
                        : t("SHOW_CONTENT_IN_THIS_LOCATION", { defaultValue: "Show content in this location" })}
                    subtitle={isSearchModal ? (
                        <>
                            {t("HIDE_SENSITIVE_CONTENT_DESCRIPTION", {
                                defaultValue: `This prevents Tweets with potentially sensitive content from displaying 
                                in your search results.`
                            })}
                            {" "}
                            <MuiLink href={TWITTER_SEARCH} variant="subtitle2" target="_blank" rel="noopener">
                                {t("LEARN_MORE", { defaultValue: "Learn more" })}
                            </MuiLink>
                        </>
                    ) : (
                        t("SHOW_CONTENT_IN_THIS_LOCATION_DESCRIPTION", {
                            defaultValue: "When this is on, you’ll see what’s happening around you right now."
                        })
                    )}
                />
                <ExploreModalInfo
                    isSearchModal={isSearchModal}
                    searchModalTitle={t("PERSONALIZATION", { defaultValue: "Personalization" })}
                    title={isSearchModal
                        ? t("REMOVE_BLOCKED_AND_MUTED_ACCOUNTS", { defaultValue: "Remove blocked and muted accounts" })
                        : t("TRENDS_FOR_YOU", { defaultValue: "Trends for you" })}
                    subtitle={isSearchModal ? (
                        <>
                            {t("REMOVE_BLOCKED_AND_MUTED_ACCOUNTS_DESCRIPTION", {
                                defaultValue: "Use this to eliminate search results from accounts you’ve blocked or muted."
                            })}
                            {" "}
                            <MuiLink href={TWITTER_SEARCH} variant="subtitle2" target="_blank" rel="noopener">
                                {t("LEARN_MORE", { defaultValue: "Learn more" })}
                            </MuiLink>
                        </>
                    ) : (
                        t("TRENDS_FOR_YOU_DESCRIPTION", {
                            defaultValue: "You can personalize trends based on your location and who you follow."
                        })
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ExploreModal;
