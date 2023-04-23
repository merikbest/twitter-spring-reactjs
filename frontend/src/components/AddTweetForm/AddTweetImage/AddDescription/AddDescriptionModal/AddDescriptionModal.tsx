import React, { FC, ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Dialog, DialogContent, FormControl, FormGroup } from "@material-ui/core";

import CloseButton from "../../../../CloseButton/CloseButton";
import { useAddDescriptionModalStyles } from "./AddDescriptionModalStyles";
import TweetInput from "../../../../TweetInput/TweetInput";

interface AddDescriptionModalProps {
    visible?: boolean;
    onClose: () => void;
    imageSrc: string;
    handleChangeDescription: (description: string) => void;
}

export interface AddDescriptionFormProps {
    description: string;
}

const AddDescriptionModal: FC<AddDescriptionModalProps> = (
    {
        visible,
        onClose,
        imageSrc,
        handleChangeDescription
    }
): ReactElement | null => {
    const classes = useAddDescriptionModalStyles();
    const { control, handleSubmit } = useForm<AddDescriptionFormProps>();

    const onSubmit = (data: AddDescriptionFormProps): void => {
        handleChangeDescription(data.description);
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle className={classes.header}>
                    <CloseButton onClose={onClose} />
                    Edit image description
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Save
                    </Button>
                </DialogTitle>
                <DialogContent id="scrollableDiv" className={classes.content}>
                    <div className={classes.contentImage}>
                        <img src={imageSrc} alt={imageSrc} />
                    </div>
                    <FormControl className={classes.inputWrapper} variant="outlined">
                        <FormGroup aria-label="position">
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <TweetInput
                                        name="about"
                                        label="Description"
                                        maxTextLength={1000}
                                        onChange={onChange}
                                        value={value}
                                        rows={3}
                                        multiline
                                    />
                                )}
                            />
                        </FormGroup>
                    </FormControl>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default AddDescriptionModal;
