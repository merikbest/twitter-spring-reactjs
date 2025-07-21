import React, { FC, ReactElement } from "react";
import { Button, Checkbox, Dialog, DialogContent, Typography } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCreateListsModalStyles } from "./CreateListsModalStyles";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";
import CreateListsModalInput from "./CreateListsModalInput";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useCreateListsModal } from "./useCreateListsModal";

interface CreateListsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const CreateListsModal: FC<CreateListsModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 650 });
    const classes = useCreateListsModalStyles();
    const { t } = useTranslation();
    const {
        wallpaper,
        setWallpaper,
        control,
        watch,
        handleSubmit,
        errors,
        onSubmit
    } = useCreateListsModal(onClose);

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitleComponent
                    title={t("CREATE_A_NEW_LIST", { defaultValue: "Create a new List" })}
                    onClose={onClose}
                >
                    <Button
                        disabled={!watch("listName")}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        {t("NEXT", { defaultValue: "Next" })}
                    </Button>
                </DialogTitleComponent>
                <DialogContent className={globalClasses.dialogContent}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img className={classes.wallpaperImg} key={wallpaper?.src} src={wallpaper?.src} />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name="wallpaper" image={wallpaper} onChangeImage={setWallpaper} />
                            </div>
                        </div>
                        <Controller
                            name="listName"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <CreateListsModalInput
                                    label={t("NAME", { defaultValue: "Name" })}
                                    name="name"
                                    helperText={errors.listName?.message}
                                    error={!!errors.listName}
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
                                    label={t("DESCRIPTION", { defaultValue: "Description" })}
                                    name="description"
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={50}
                                    hasDescription
                                />
                            )}
                        />
                        <div className={globalClasses.itemInfoWrapper}>
                            <div className={classes.footerWrapper}>
                                <Typography variant="body1" component="div">
                                    {t("MAKE_PRIVATE", { defaultValue: "Make private" })}
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
                            <Typography variant="subtitle2" component="div">
                                {t("MAKE_PRIVATE_DESCRIPTION", {
                                    defaultValue: "When you make a List private, only you can see it."
                                })}
                            </Typography>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateListsModal;
