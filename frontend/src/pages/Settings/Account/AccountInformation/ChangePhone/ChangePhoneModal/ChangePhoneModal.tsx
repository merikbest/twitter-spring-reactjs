import React, { ChangeEvent, FC, memo, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    FormControl,
    InputLabel,
    Link as MuiLink,
    Typography
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useChangePhoneModalStyles } from "./ChangePhoneModalStyles";
import { TweetIcon } from "../../../../../../icons";
import { ChangeInfoTextField } from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import { FilledSelect } from "../../../../../../components/FilledSelect/FilledSelect";
import {
    selectUserIsLoading,
    selectUserProfilePhone,
    selectUserProfilePhoneCode
} from "../../../../../../store/ducks/user/selectors";
import { updatePhone } from "../../../../../../store/ducks/user/actionCreators";
import { EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS } from "../../../../../../constants/url-constants";
import { fetchCountryCodes } from "../../../../../../store/ducks/countryCode/actionCreators";
import {
    selectCountryCodeItems,
    selectIsCountryCodesLoading
} from "../../../../../../store/ducks/countryCode/selectors";

interface ChangePhoneModalProps {
    visible?: boolean;
    onClose: () => void;
}

interface PhoneFormProps {
    phone: string;
}

const SetPhoneFormSchema = yup.object().shape({
    phone: yup.string().matches(/^[0-9]\d{8}$/, "Please enter a valid phone number.").required()
});

const ChangePhoneModal: FC<ChangePhoneModalProps> = memo(({ visible, onClose }): ReactElement | null => {
    const classes = useChangePhoneModalStyles();
    const dispatch = useDispatch();
    const countryCodes = useSelector(selectCountryCodeItems);
    const isCountryCodesLoading = useSelector(selectIsCountryCodesLoading);
    const profilePhoneCode = useSelector(selectUserProfilePhoneCode);
    const profilePhone = useSelector(selectUserProfilePhone);
    const isLoading = useSelector(selectUserIsLoading);
    const [phoneCode, setPhoneCode] = useState<string>("");
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<PhoneFormProps>({
        resolver: yupResolver(SetPhoneFormSchema),
        mode: "onChange"
    });

    useEffect(() => {
        if (visible) {
            dispatch(fetchCountryCodes());
        }
        if (profilePhoneCode) {
            setPhoneCode(profilePhoneCode);
        }
    }, [visible, profilePhoneCode]);

    const onSubmit = (data: PhoneFormProps): void => {
        dispatch(updatePhone({ phoneCode, phone: parseInt(data.phone) }));
    };

    const changeCountryCode = (event: ChangeEvent<{ value: unknown }>): void => {
        setPhoneCode(event.target.value as string);
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog transitionDuration={0} open={visible} onClose={onClose} className={classes.dialog}>
            <DialogContent className={classes.content}>
                <div className={classes.logoIcon}>
                    {TweetIcon}
                </div>
                <div>
                    <Typography variant={"h3"} component={"div"}>
                        Change phone
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        {`Your current phone number is ${profilePhoneCode ? `${profilePhoneCode}${profilePhone}` : "none"}. What would you like to update it to?`}
                    </Typography>
                </div>
                <form onSubmit={(!getValues("phone") || !!errors.phone) ? onClose : handleSubmit(onSubmit)}>
                    <div className={classes.selectWrapper}>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="select-country-code">
                                Country code
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                labelId="select-country-code"
                                id="select-country-code"
                                native
                                value={phoneCode}
                                onChange={changeCountryCode}
                                disabled={isCountryCodesLoading}
                                label="Country code"
                                fullWidth
                            >
                                <option aria-label="None" />
                                {countryCodes.map(countryCode => (
                                        <option key={countryCode.id} value={countryCode.phoneCode}>
                                            {countryCode.phoneCode} {countryCode.country}
                                        </option>
                                    )
                                )}
                            </FilledSelect>
                        </FormControl>
                    </div>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ChangeInfoTextField
                                inputMode="tel"
                                id="phone"
                                name="phone"
                                label="Your phone number"
                                variant="filled"
                                onChange={onChange}
                                value={value}
                                disabled={isLoading}
                                helperText={errors.phone?.message}
                                error={!!errors.phone}
                                fullWidth
                            />
                        )}
                    />
                    <div className={classes.infoWrapper}>
                        <Typography variant={"body1"} component={"span"}>
                            {"Let people who have your phone number find and connect with you on Twitter. "}
                            <MuiLink href={EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS} variant="body1" target="_blank"
                                     rel="noopener">
                                Learn more
                            </MuiLink>
                        </Typography>
                        <span><Checkbox /></span>
                    </div>
                    <div className={classes.footer}>
                        <Button
                            color="primary"
                            variant={((!getValues("phone")|| errors.phone || !phoneCode) ) ? "outlined" : "contained"}
                            type="submit"
                            size="small"
                            fullWidth
                        >
                            {((!getValues("phone") || errors.phone || !phoneCode)) ? "Cancel" : "Next"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
});

export default ChangePhoneModal;
