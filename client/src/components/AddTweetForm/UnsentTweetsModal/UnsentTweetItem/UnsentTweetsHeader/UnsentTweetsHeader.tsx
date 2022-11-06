import React, {FC, memo, ReactElement} from "react";
import {Button, DialogTitle} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import CloseButton from "../../../../CloseButton/CloseButton";

interface UnsentTweetsHeaderProps {
    classes: ClassNameMap<string>
    visibleEditTweetModal: boolean;
    visibleEditListFooter: boolean;
    onCloseEditTweetList: () => void;
    onOpenEditTweetList: () => void;
    onCloseEditTweetModal: () => void;
    onClose: () => void;
}

const UnsentTweetsHeader: FC<UnsentTweetsHeaderProps> = memo((
    {
        classes,
        visibleEditTweetModal,
        visibleEditListFooter,
        onCloseEditTweetList,
        onOpenEditTweetList,
        onCloseEditTweetModal,
        onClose
    }
): ReactElement => {
    return (
        <DialogTitle>
            <CloseButton onClose={!visibleEditTweetModal ? onClose : onCloseEditTweetModal}/>
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
