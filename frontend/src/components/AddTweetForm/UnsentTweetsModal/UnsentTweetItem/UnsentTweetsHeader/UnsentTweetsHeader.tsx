import React, { FC, memo, ReactElement } from "react";
import { Button, DialogTitle } from "@material-ui/core";

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

    return (
        <DialogTitle>
            <CloseButton onClose={!visibleEditTweetModal ? onClose : onCloseEditTweetModal} />
            {!visibleEditTweetModal && "Unsent Tweets"}
            {visibleEditTweetModal ? (
                <Button
                    className={classes.outlinedButton}
                    onClick={onCloseEditTweetModal}
                    type="submit"
                    variant="text"
                    color="primary"
                >
                    Unsent Tweets
                </Button>
            ) : (
                <Button
                    onClick={visibleEditListFooter ? onCloseEditTweetList : onOpenEditTweetList}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    {visibleEditListFooter ? "Done" : "Edit"}
                </Button>
            )}
        </DialogTitle>
    );
});

export default UnsentTweetsHeader;
