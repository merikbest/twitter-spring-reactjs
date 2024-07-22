import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Radio, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { useChangeGenderStyles } from "./ChangeGenderStyles";
import { ChangeInfoTextField } from "../../../ChangeInfoTextField/ChangeInfoTextField";
import { updateGender } from "../../../../../store/ducks/user/actionCreators";
import { selectUserIsLoading, selectUserProfileGender } from "../../../../../store/ducks/user/selectors";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";

interface ChangeGenderFormProps {
    gender: string;
}
const errorMessage = "Incorrect gender length";

const ChangeGenderFormSchema = yup.object().shape({
    gender: yup.string()
        .min(1, errorMessage)
        .max(30, errorMessage)
        .required(errorMessage)
        .nullable(true)
});

enum Gender {
    FEMALE = "Female",
    MALE = "Male",
    OTHER = "Other",
}

const ChangeGender: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useChangeGenderStyles();
    const dispatch = useDispatch();
    const gender = useSelector(selectUserProfileGender);
    const isLoading = useSelector(selectUserIsLoading);
    const [selectedGender, setSelectedGender] = useState<Gender>(Gender.FEMALE);

    useEffect(() => {
        if (gender) {
            const isKnownGender = gender === Gender.FEMALE || gender === Gender.MALE;
            setSelectedGender(isKnownGender ? gender : Gender.OTHER);
        }
    }, []);

    const { control, handleSubmit, formState: { errors } } = useForm<ChangeGenderFormProps>({
        defaultValues: {
            gender: gender ?? selectedGender
        },
        resolver: yupResolver(ChangeGenderFormSchema)
    });

    const handleSelectedGender = (event: ChangeEvent<HTMLInputElement>): void => {
        setSelectedGender(event.target.value as Gender);
    };

    const onSubmit = (data: ChangeGenderFormProps): void => {
        const gender = selectedGender === Gender.OTHER ? data.gender : selectedGender;
        dispatch(updateGender({ gender }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={"subtitle1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                If you haven’t already specified a gender, this is the one associated with your account based on
                your profile and activity. This information won’t be displayed publicly.
            </Typography>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Female
                    </Typography>
                        <Radio
                            checked={selectedGender === Gender.FEMALE}
                            onChange={handleSelectedGender}
                            value={Gender.FEMALE}
                            name="radio-buttons"
                            inputProps={{ "aria-label": "Female" }}
                            icon={<RadioButtonUnchecked color={"primary"} />}
                            checkedIcon={<CheckCircle color={"primary"} />}
                            size="small"
                        />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Male
                    </Typography>
                        <Radio
                            checked={selectedGender === Gender.MALE}
                            onChange={handleSelectedGender}
                            value={Gender.MALE}
                            name="radio-buttons"
                            inputProps={{ "aria-label": "Male" }}
                            icon={<RadioButtonUnchecked color={"primary"} />}
                            checkedIcon={<CheckCircle color={"primary"} />}
                            size="small"
                        />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Other
                    </Typography>
                    <Radio
                        checked={selectedGender === Gender.OTHER}
                        onChange={handleSelectedGender}
                        value={Gender.OTHER}
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Other" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
                {(selectedGender === Gender.OTHER) && (
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <div className={classes.textFieldWrapper}>
                                <ChangeInfoTextField
                                    name="gender"
                                    onChange={onChange}
                                    helperText={errors.gender?.message}
                                    error={!!errors.gender}
                                    label="Gender"
                                    type="text"
                                    variant="filled"
                                    value={value}
                                    fullWidth
                                />
                            </div>
                        )}
                    />
                )}
            </div>
            <Divider />
            <div className={classes.buttonWrapper}>
                <Button
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default withDocumentTitle(ChangeGender)("Change gender");
