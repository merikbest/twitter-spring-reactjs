import React, { FC, ReactElement } from "react";
import { Dialog, DialogContent, Link as MuiLink } from "@material-ui/core";

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

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitleComponent title={isSearchModal ? "Search settings" : "Explore settings"} onClose={onClose} />
            <DialogContent className={globalClasses.dialogContent}>
                <ExploreModalInfo
                    isSearchModal={isSearchModal}
                    searchModalTitle={"Location"}
                    title={isSearchModal ? "Hide sensitive content" : "Show content in this location"}
                    subtitle={isSearchModal ? (
                        <>
                            {`This prevents Tweets with potentially sensitive content from displaying in your search results. `}
                            <MuiLink href={TWITTER_SEARCH} variant="subtitle2" target="_blank" rel="noopener">
                                Learn more
                            </MuiLink>
                        </>
                    ) : (
                        "When this is on, you’ll see what’s happening around you right now."
                    )}
                />
                <ExploreModalInfo
                    isSearchModal={isSearchModal}
                    searchModalTitle={"Personalization"}
                    title={isSearchModal ? "Remove blocked and muted accounts" : "Trends for you"}
                    subtitle={isSearchModal ? (
                        <>
                            {`Use this to eliminate search results from accounts you’ve blocked or muted. `}
                            <MuiLink href={TWITTER_SEARCH} variant="subtitle2" target="_blank" rel="noopener">
                                Learn more
                            </MuiLink>
                        </>
                    ) : (
                        "You can personalize trends based on your location and who you follow."
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ExploreModal;
