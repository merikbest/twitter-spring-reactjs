import React, { FC, memo, ReactElement } from "react";
import { Button, DialogTitle } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import CloseButton from "../../../../CloseButton/CloseButton";
import { useUnsentTweetsHeaderStyles } from "./UnsentTweetsHeaderStyles";

interface UnsentTweetsHeaderProps {
    visibleEditTweetModal: boolean;
    visibleEditListFooter: boolean;
    onCloseEditTweetList: () => void;
    onOpenEditTweetList: () => void;
    onCloseEditTweetModal: () => void;
    onClose: () => void;
}

const UnsentTweetsHeader: FC<UnsentTweetsHeaderProps> = memo((
    {
        visibleEditTweetModal,
        visibleEditListFooter,
        onCloseEditTweetList,
        onOpenEditTweetList,
        onCloseEditTweetModal,
        onClose
    }
): ReactElement => {
    const classes = useUnsentTweetsHeaderStyles();
    const { t } = useTranslation();

    return (
        <DialogTitle>
            <CloseButton onClose={!visibleEditTweetModal ? onClose : onCloseEditTweetModal} />
            {!visibleEditTweetModal && t("UNSENT_TWEETS", { defaultValue: "Unsent Tweets" })}
            {visibleEditTweetModal ? (
                <Button
                    className={classes.outlinedButton}
                    onClick={onCloseEditTweetModal}
                    type="submit"
                    variant="text"
                    color="primary"
                >
                    {t("UNSENT_TWEETS", { defaultValue: "Unsent Tweets" })}
                </Button>
            ) : (
                <Button
                    onClick={visibleEditListFooter ? onCloseEditTweetList : onOpenEditTweetList}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    {visibleEditListFooter
                        ? t("DONE", { defaultValue: "Done" })
                        : t("EDIT", { defaultValue: "Edit" })}
                </Button>
            )}
        </DialogTitle>
    );
});

export default UnsentTweetsHeader;
