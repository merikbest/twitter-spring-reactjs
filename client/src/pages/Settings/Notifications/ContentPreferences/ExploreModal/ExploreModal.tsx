import React, {FC, ReactElement, useState} from 'react';
import {Checkbox, Dialog, DialogContent, Divider, Link as MuiLink, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

import {useExploreModalStyles} from "./ExploreModalStyles";
import {useGlobalStyles} from "../../../../../util/globalClasses";
import CloseButton from "../../../../../components/CloseButton/CloseButton";

export interface ExploreModalProps {
    visible?: boolean;
    onClose: () => void;
    isSearchModal: boolean;
}

const ExploreModal: FC<ExploreModalProps> = ({visible, onClose, isSearchModal}): ReactElement | null => {
    const globalClasses = useGlobalStyles();
    const classes = useExploreModalStyles();
    const [checked1, setChecked1] = useState<boolean>(true);
    const [checked2, setChecked2] = useState<boolean>(true);

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <CloseButton onClose={onClose}/>
                {isSearchModal ? "Search settings" : "Explore settings"}
            </DialogTitle>
            <DialogContent className={classes.content}>
                {!isSearchModal && (
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Location
                        </Typography>
                    </div>
                )}
                <div className={globalClasses.itemInfoWrapper}>
                    <div className={globalClasses.infoItemCheckbox}>
                        <Typography variant={"body1"} component={"span"}>
                            {isSearchModal ? "Hide sensitive content" : "Show content in this location"}
                        </Typography>
                        <Checkbox checked={checked1} onChange={() => setChecked1(prevState => !prevState)}/>
                    </div>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {isSearchModal ? (
                            <>
                                {`This prevents Tweets with potentially sensitive content from displaying in your search results. `}
                                <MuiLink
                                    href="https://help.twitter.com/using-twitter/twitter-search"
                                    variant="subtitle2"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Learn more
                                </MuiLink>
                            </>
                        ) : (
                            "When this is on, you’ll see what’s happening around you right now."
                        )}
                    </Typography>
                </div>
                {!isSearchModal && (
                    <>
                        <Divider/>
                        <div className={globalClasses.itemInfoWrapper}>
                            <Typography variant={"h5"} component={"div"}>
                                Personalization
                            </Typography>
                        </div>
                    </>
                )}
                <div className={globalClasses.itemInfoWrapper}>
                    <div className={globalClasses.infoItemCheckbox}>
                        <Typography variant={"body1"} component={"span"}>
                            {isSearchModal ? "Remove blocked and muted accounts" : "Trends for you"}
                        </Typography>
                        <Checkbox checked={checked2} onChange={() => setChecked2(prevState => !prevState)}/>
                    </div>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {isSearchModal ? (
                            <>
                                {`Use this to eliminate search results from accounts you’ve blocked or muted. `}
                                <MuiLink
                                    href="https://help.twitter.com/using-twitter/twitter-search"
                                    variant="subtitle2"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Learn more
                                </MuiLink>
                            </>
                        ) : (
                            "You can personalize trends based on your location and who you follow."
                        )}
                    </Typography>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ExploreModal;