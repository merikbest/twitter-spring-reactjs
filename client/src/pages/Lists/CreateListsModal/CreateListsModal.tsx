import React, {ChangeEvent, FC, FormEvent, ReactElement, useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Checkbox, Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";

import {useCreateListsModalStyles} from "./CreateListsModalStyles";
import UploadProfileImage from "../../../components/EditProfileModal/UploadProfileImage";
import {ImageObj} from "../../../components/AddTweetForm/AddTweetForm";
import {uploadImage} from "../../../util/uploadImage";
import {Image} from "../../../store/ducks/tweets/contracts/state";
import CreateListsModalInput from "./CreateListsModalInput/CreateListsModalInput";
import {createList} from "../../../store/ducks/lists/actionCreators";
import {wallpapers} from "../../../util/wallpapers";
import CloseButton from "../../../components/CloseButton/CloseButton";

interface CreateListsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const CreateListsModal: FC<CreateListsModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useCreateListsModalStyles();
    const dispatch = useDispatch();

    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [listName, setListName] = useState<string>("");
    const [listDescription, setListDescription] = useState<string>("");
    const [isListPrivate, setIsListPrivate] = useState<boolean>(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const altWallpaper = Math.floor(Math.random() * wallpapers.length);
        let wallpaperResponse: Image | undefined = undefined;

        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(createList({
            name: listName,
            description: listDescription,
            isPrivate: isListPrivate,
            altWallpaper: wallpapers[altWallpaper],
            wallpaper: wallpaperResponse
        }));
        onClose();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setIsListPrivate(event.target.checked);
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={onSubmit}>
                <DialogTitle id="form-dialog-title">
                    <CloseButton onClose={onClose}/>
                    Create a new List
                    <Button
                        className={classes.button}
                        disabled={listName === ""}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Next
                    </Button>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img
                                className={classes.wallpaperImg}
                                key={wallpaper?.src}
                                src={wallpaper?.src}
                            />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper}/>
                            </div>
                        </div>
                        <CreateListsModalInput
                            label={"Name"}
                            onChange={setListName}
                            value={listName}
                            maxTextLength={25}
                        />
                        <CreateListsModalInput
                            label={"Description"}
                            onChange={setListDescription}
                            value={listDescription}
                            maxTextLength={50}
                        />
                        <div className={classes.footer}>
                            <div className={classes.footerWrapper}>
                                <Typography component={"div"} className={classes.footerTitle}>
                                    Make private
                                </Typography>
                                <Checkbox
                                    checked={isListPrivate}
                                    onChange={handleChange}
                                    name="private"
                                    color="primary"
                                />
                            </div>
                            <Typography component={"div"} className={classes.footerText}>
                                When you make a List private, only you can see it.
                            </Typography>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateListsModal;
