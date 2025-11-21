import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

import { selectUserData } from "../../../../store/ducks/user/selectors";
import { uploadImage } from "../../../../util/upload-image-helper";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { updatedUserData } from "../../../../store/ducks/user/actionCreators";

export enum BirthDateVisibility {
    PUBLIC = "PUBLIC",
    YOUR_FOLLOWERS = "YOUR_FOLLOWERS",
    PEOPLE_YOU_FOLLOW = "PEOPLE_YOU_FOLLOW",
    YOU_FOLLOW_EACH_OTHER = "YOU_FOLLOW_EACH_OTHER",
    ONLY_YOU = "ONLY_YOU"
}

export interface EditProfileFormProps {
    fullName: string;
    about: string;
    location: string;
    website: string;
    year: number;
    month: number;
    day: number;
    showMonthAndDay: BirthDateVisibility;
    showYear: BirthDateVisibility;
    birthdate?: string;
}

const editProfileModalFormSchema = (t: TFunction<"translation", undefined>) =>
    yup.object()
        .shape({
            fullName: yup
                .string()
                .min(1, t("NAME_ERROR", { defaultValue: "Name can’t be blank" }))
                .required(),
            year: yup.number().notOneOf([0], "Zero is not allowed"),
            month: yup.number().notOneOf([0], "Zero is not allowed"),
            day: yup.number().notOneOf([0], "Zero is not allowed"),
        })
        .test("birthdate-valid", value => {
            const { year, month, day } = value;
            const allZero = year === 0 && month === 0 && day === 0;
            const allFilled = year !== 0 && month !== 0 && day !== 0;

            if (allZero) {
                return true;
            }
            if (allFilled) {
                return true;
            }
            return new yup.ValidationError(
                t("INVALID_BIRTHDATE", { defaultValue: "Please enter a valid date" }),
                value,
                "birthdate"
            );
        });

const useEditProfileModal = (onClose: () => void) => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const { t } = useTranslation();

    const { control, watch, handleSubmit, formState: { errors } } = useForm<EditProfileFormProps>({
        defaultValues: {
            fullName: userData?.fullName,
            about: userData?.about,
            location: userData?.location,
            website: userData?.website
        },
        resolver: yupResolver(editProfileModalFormSchema(t))
    });

    const onSubmit = async (data: EditProfileFormProps): Promise<void> => {
        let avatarResponse: string | undefined = undefined;
        let wallpaperResponse: string | undefined = undefined;

        if (avatar) {
            avatarResponse = await uploadImage(avatar.file);
        }
        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(updatedUserData({ ...data, avatar: avatarResponse!, wallpaper: wallpaperResponse! }));
        onClose();
    };

    return {
        userData,
        avatar,
        wallpaper,
        control,
        watch,
        errors,
        setAvatar,
        setWallpaper,
        handleSubmit,
        onSubmit
    };
};

export default useEditProfileModal;
