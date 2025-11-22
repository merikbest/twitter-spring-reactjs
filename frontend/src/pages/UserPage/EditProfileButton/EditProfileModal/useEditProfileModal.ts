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
import { BirthDateVisibility } from "../../../../store/ducks/user/contracts/state";
import { formatBirthdate } from "../../../../util/format-date-helper";

export interface EditProfileFormProps {
    fullName: string;
    about: string;
    location: string;
    website: string;
    year: number;
    month: number;
    day: number;
    monthAndDayVisibility: BirthDateVisibility;
    yearVisibility: BirthDateVisibility;
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
    const [avatarImage, setAvatarImage] = useState<ImageObj>();
    const [wallpaperImage, setWallpaperImage] = useState<ImageObj>();
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
        const upload = (img) => img ? uploadImage(img.file) : Promise.resolve(undefined);
        const [avatar, wallpaper] = await Promise.all([
            upload(avatarImage),
            upload(wallpaperImage),
        ]);
        const birthdate = formatBirthdate(data.year, data.month, data.day);
        dispatch(updatedUserData({ ...data, birthdate, avatar: avatar!, wallpaper: wallpaper! }));
        onClose();
    };

    return {
        userData,
        avatarImage,
        wallpaperImage,
        control,
        watch,
        errors,
        setAvatarImage,
        setWallpaperImage,
        handleSubmit,
        onSubmit
    };
};

export default useEditProfileModal;
