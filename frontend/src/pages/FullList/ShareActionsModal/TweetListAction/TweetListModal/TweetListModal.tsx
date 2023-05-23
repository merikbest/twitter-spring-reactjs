import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";

import DialogTitleComponent from "../../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useTweetListModalStyles } from "./TweetListModalStyles";
import AddTweetForm from "../../../../../components/AddTweetForm/AddTweetForm";
import { selectListItem } from "../../../../../store/ducks/list/selectors";

interface TweetListModalProps {
    visibleModalWindow: boolean;
    onCloseModalWindow: () => void;
}

const TweetListModal: FC<TweetListModalProps> = ({ visibleModalWindow, onCloseModalWindow }): ReactElement | null => {
    const classes = useTweetListModalStyles();
    const list = useSelector(selectListItem);

    if (!visibleModalWindow) {
        return null;
    }

    return (
        <Dialog className={classes.content} open={visibleModalWindow} onClose={onCloseModalWindow}>
            <DialogTitleComponent onClose={onCloseModalWindow} />
            <DialogContent className={classes.dialogContent}>
                <AddTweetForm
                    tweetList={list}
                    minRows={1}
                    title={"What's happening?"}
                    buttonName={"Tweet"}
                    onCloseModal={onCloseModalWindow}
                />
            </DialogContent>
        </Dialog>
    );
};

export default TweetListModal;
