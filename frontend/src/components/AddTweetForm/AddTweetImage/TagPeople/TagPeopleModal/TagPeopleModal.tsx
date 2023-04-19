import React, { FC, ReactElement, useState } from "react";
import { Button, Dialog, DialogContent, Divider, InputAdornment } from "@material-ui/core";

import { useTagPeopleModalStyles } from "./TagPeopleModalStyles";
import CloseButton from "../../../../CloseButton/CloseButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MessagesModalInput } from "../../../../../pages/Messages/MessagesModal/MessagesModalInput/MessagesModalInput";
import { SearchIcon } from "../../../../../icons";

interface TagPeopleModalProps {
    visible?: boolean;
    onClose: () => void;
}

const TagPeopleModal: FC<TagPeopleModalProps> = ({ visible, onClose }): ReactElement | null => {
    const classes = useTagPeopleModalStyles();
    const [text, setText] = useState("");

    const onSearch = (text: string): void => {

    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitle className={classes.header}>
                <CloseButton onClose={onClose} />
                Tag people
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    // disabled={!selectedIndex}
                >
                    Done
                </Button>
            </DialogTitle>
            <DialogContent id="scrollableDiv" className={classes.content}>
                <form>
                    <MessagesModalInput
                        fullWidth
                        placeholder="Search people"
                        variant="outlined"
                        onChange={(event) => onSearch(event.target.value)}
                        value={text}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SearchIcon}
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
                <Divider />
            </DialogContent>
        </Dialog>
    );
};

export default TagPeopleModal;
