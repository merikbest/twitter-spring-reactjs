import React, { FC, ReactElement } from "react";
import { Button, Checkbox, Dialog, DialogContent, Typography } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useEditListModalStyles } from "./EditListModalStyles";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";
import CreateListsModalInput
    from "../../../Lists/ListsHeader/CreateListsModal/CreateListsModalInput/CreateListsModalInput";
import ManageMembersModal from "./ManageMembersModal";
import DeleteListModal from "./DeleteListModal";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useEditListModal } from "./useEditListModal";

interface EditListModalProps {
    visible?: boolean;
    onClose: () => void;
}

const EditListModal: FC<EditListModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 569 });
    const classes = useEditListModalStyles();
    const { t } = useTranslation();
    const {
        listWrapperSrc,
        wallpaper,
        setWallpaper,
        isListPrivate,
        handleChange,
        control,
        handleSubmit,
        errors,
        onSubmit
    } = useEditListModal(onClose);

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitleComponent
                    title={t("EDIT_LIST", { defaultValue: "Edit List" })}
                    onClose={onClose}
                >
                    <Button type="submit" variant="contained" color="primary" size="small">
                        {t("DONE", { defaultValue: "Done" })}
                    </Button>
                </DialogTitleComponent>
                <DialogContent className={globalClasses.dialogContent}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img
                                className={classes.wallpaperImg}
                                key={listWrapperSrc}
                                src={listWrapperSrc}
                                alt={listWrapperSrc}
                            />
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
                                <Checkbox
                                    checked={isListPrivate}
                                    onChange={handleChange}
                                    name="private"
                                    color="primary"
                                />
                            </div>
                            <Typography variant="subtitle2" component="div">
                                {t("MAKE_PRIVATE_DESCRIPTION", { defaultValue: "When you make a List private, only you can see it." })}
                            </Typography>
                        </div>
                        <ManageMembersModal />
                        <DeleteListModal />
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditListModal;
