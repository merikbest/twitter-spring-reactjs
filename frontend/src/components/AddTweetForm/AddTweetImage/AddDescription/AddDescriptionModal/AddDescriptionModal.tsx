import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, DialogContent, FormControl, FormGroup } from "@material-ui/core";

import { useAddDescriptionModalStyles } from "./AddDescriptionModalStyles";
import TweetInput from "../../../../TweetInput/TweetInput";
import DialogTitleComponent from "../../../../DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { setImageDescription } from "../../../../../store/ducks/addTweetForm/actionCreators";
import { selectImages } from "../../../../../store/ducks/addTweetForm/selector";

interface AddDescriptionModalProps {
    visible?: boolean;
    onClose: () => void;
}

export interface AddDescriptionFormProps {
    description: string;
}

const AddDescriptionModal: FC<AddDescriptionModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 666 });
    const classes = useAddDescriptionModalStyles();
    const dispatch = useDispatch();
    const images = useSelector(selectImages);
    const { control, handleSubmit } = useForm<AddDescriptionFormProps>();

    const onSubmit = (data: AddDescriptionFormProps): void => {
        dispatch(setImageDescription(data.description));
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitleComponent title={"Edit image description"} onClose={onClose} borderBottom>
                    <Button type="submit" variant="contained" color="primary" size="small">
                        Save
                    </Button>
                </DialogTitleComponent>
                <DialogContent id="scrollableDiv" className={globalClasses.dialogContent}>
                    <div className={classes.contentImage}>
                        <img src={images[0].src} alt={images[0].src} />
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
