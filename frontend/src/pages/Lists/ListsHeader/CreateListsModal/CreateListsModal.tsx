import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Dialog, DialogContent, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useCreateListsModalStyles } from "./CreateListsModalStyles";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { uploadImage } from "../../../../util/upload-image-helper";
import CreateListsModalInput from "./CreateListsModalInput/CreateListsModalInput";
import { createList } from "../../../../store/ducks/lists/actionCreators";
import { wallpapers } from "../../../../util/wallpapers";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";

interface CreateListsModalProps {
    visible?: boolean;
    onClose: () => void;
}

interface CreateListsModalFormProps {
    name: string;
    description: string;
    isPrivate: boolean;
    wallpaper: string;
}

const CreateListsModalFormSchema = yup.object().shape({
    name: yup.string().min(1, "List Name can’t be blank").required()
});

const CreateListsModal: FC<CreateListsModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 650 });
    const classes = useCreateListsModalStyles();
    const dispatch = useDispatch();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const { control, watch, handleSubmit, formState: { errors } } = useForm<CreateListsModalFormProps>({
        resolver: yupResolver(CreateListsModalFormSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: CreateListsModalFormProps): Promise<void> => {
        const altWallpaper = Math.floor(Math.random() * wallpapers.length);
        let wallpaperResponse: string | undefined = undefined;

        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(createList({
            ...data,
            altWallpaper: wallpapers[altWallpaper],
            wallpaper: wallpaperResponse
        }));
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitleComponent title={"Create a new List"} onClose={onClose}>
                    <Button
                        disabled={!watch("name")}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Next
                    </Button>
                </DialogTitleComponent>
                <DialogContent className={globalClasses.dialogContent}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img className={classes.wallpaperImg} key={wallpaper?.src} src={wallpaper?.src} />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper} />
                            </div>
                        </div>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <CreateListsModalInput
                                    label={"Name"}
                                    name={"name"}
                                    helperText={errors.name?.message}
                                    error={!!errors.name}
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={25}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <CreateListsModalInput
                                    label={"Description"}
                                    name={"description"}
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={50}
                                />
                            )}
                        />
                        <div className={globalClasses.itemInfoWrapper}>
                            <div className={classes.footerWrapper}>
                                <Typography variant={"body1"} component={"div"}>
                                    Make private
                                </Typography>
                                <Controller
                                    name="isPrivate"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox
                                            checked={value}
                                            onChange={onChange}
                                            name="private"
                                            color="primary"
                                        />
                                    )}
                                />
                            </div>
                            <Typography variant={"subtitle2"} component={"div"}>
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
