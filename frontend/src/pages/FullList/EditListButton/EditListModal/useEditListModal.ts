import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { editList } from "../../../../store/ducks/list/actionCreators";
import { uploadImage } from "../../../../util/upload-image-helper";
import { selectListItem } from "../../../../store/ducks/list/selectors";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";

interface EditListModalFormProps {
    id: number;
    listName: string;
    description: string;
    isPrivate: boolean;
    wallpaper: string;
}

const editListModalFormSchema = (t: any) =>
    yup.object().shape({
        listName: yup
            .string()
            .min(1, t("LIST_NAME_ERROR", { defaultValue: "List Name can’t be blank" }))
            .required(),
    });

export const useEditListModal = (onClose: () => void) => {
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const { t } = useTranslation();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [isListPrivate, setIsListPrivate] = useState<boolean>(false);
    const listWrapperSrc = list?.wallpaper ?? list?.altWallpaper;

    const { control, handleSubmit, formState: { errors } } = useForm<EditListModalFormProps>({
        defaultValues: {
            id: list?.id,
            listName: list?.listName,
            description: list?.description,
            isPrivate: list?.isPrivate,
            wallpaper: list?.wallpaper,
        },
        resolver: yupResolver(editListModalFormSchema(t)),
        mode: "onChange",
    });

    useEffect(() => {
        setIsListPrivate(list?.isPrivate!);
    }, [list]);

    const onSubmit: SubmitHandler<EditListModalFormProps> = async (data) => {
        let wallpaperResponse: string | undefined = undefined;

        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }
        dispatch(editList({
            ...data,
            isPrivate: isListPrivate,
            wallpaper: wallpaperResponse,
        }));
        onClose();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setIsListPrivate(event.target.checked);
    };

    return {
        listWrapperSrc,
        wallpaper,
        setWallpaper,
        isListPrivate,
        handleChange,
        control,
        handleSubmit,
        errors,
        onSubmit
    };
};