import React, { FC, ReactElement } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useTranslation } from "react-i18next";

import { useTweetComponentActionsModalStyles } from "./TweetComponentActionsModalStyles";

interface TweetComponentActionsModalProps {
    isDeleteModal?: boolean;
    isTweetPinned?: boolean;
    visibleTweetComponentActionsModal: boolean;
    onCloseTweetComponentActionsModal: () => void;
    onClick: () => void;
}

const TweetComponentActionsModal: FC<TweetComponentActionsModalProps> = (
    {
        isDeleteModal,
        isTweetPinned,
        visibleTweetComponentActionsModal,
        onCloseTweetComponentActionsModal,
        onClick
    }
): ReactElement => {
    const classes = useTweetComponentActionsModalStyles({ isDeleteModal });
    const { t } = useTranslation();

    return (
        <Dialog open={visibleTweetComponentActionsModal} onClose={onCloseTweetComponentActionsModal}>
            <DialogContent style={{ padding: 0 }}>
                <div className={classes.modalWrapper}>
                    <Typography variant="h5">
                        {isDeleteModal
                            ? t("DELETE_TWEET", { defaultValue: "Delete Tweet?" })
                            : isTweetPinned
                                ? t("UNPIN_TWEET", { defaultValue: "Unpin Tweet from profile?" })
                                : t("PIN_TWEET", { defaultValue: "Pin Tweet to profile?" })}
                    </Typography>
                    <Typography variant="subtitle1">
                        {isDeleteModal
                            ? t("DELETE_TWEET_DESCRIPTION", {
                                defaultValue: `This can’t be undone and it will be removed from your profile, 
                                the timeline of any accounts that follow you, and from Twitter search results.` })
                            : isTweetPinned
                                ? t("UNPIN_TWEET_DESCRIPTION", {
                                    defaultValue: "This will no longer appear automatically at the top of your profile." })
                                : t("PIN_TWEET_DESCRIPTION", {
                                    defaultValue: "This will appear at the top of your profile and replace any previously pinned Tweet." })}
                    </Typography>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onCloseTweetComponentActionsModal}
                            variant="contained"
                            size="large"
                        >
                            {t("CANCEL", { defaultValue: "Cancel" })}
                        </Button>
                        <Button
                            className={isDeleteModal
                                ? classes.modalDeleteButton
                                : classes.modalPrimaryButton}
                            onClick={onClick}
                            variant="contained"
                            size="large"
                        >
                            {isDeleteModal
                                ? t("DELETE", { defaultValue: "Delete" })
                                : isTweetPinned
                                        ? t("UNPIN", { defaultValue: "Unpin" })
                                        : t("PIN", { defaultValue: "Pin" })}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetComponentActionsModal;
