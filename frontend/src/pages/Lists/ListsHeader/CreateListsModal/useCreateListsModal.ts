import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TFunction } from "i18next";

import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { uploadImage } from "../../../../util/upload-image-helper";
import { createList } from "../../../../store/ducks/lists/actionCreators";
import { wallpapers } from "../../../../util/wallpapers";
import { useTranslation } from "react-i18next";

interface CreateListsModalFormProps {
    listName: string;
    description: string;
    isPrivate: boolean;
    wallpaper: string;
}

export const useCreateListsModal = (onClose: () => void) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const createListsModalFormSchema = yup.object().shape({
        listName: yup.string().min(1, t("LIST_NAME_ERROR", { defaultValue: "List Name can’t be blank" })).required()
    });
    const { control, watch, handleSubmit, formState: { errors } } = useForm<CreateListsModalFormProps>({
        resolver: yupResolver(createListsModalFormSchema),
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<CreateListsModalFormProps> = async (data) => {
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

    return {
        wallpaper,
        setWallpaper,
        control,
        watch,
        handleSubmit,
        errors,
        onSubmit
    };
};
