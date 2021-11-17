import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, Dialog, DialogContent, FormControl, InputLabel, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import classNames from "classnames";
import * as yup from "yup";

import {useChangePhoneModalStyles} from "./ChangePhoneModalStyles";
import {TweetIcon} from "../../../../../../icons";
import {ChangeInfoTextField} from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import {FilledSelect} from "../../../../../../components/FilledSelect/FilledSelect";
import {selectUserData, selectUserIsLoading} from "../../../../../../store/ducks/user/selectors";
import {updatePhone} from "../../../../../../store/ducks/user/actionCreators";
import {getCountryCode, getPhoneCode} from "../../../../../../util/countryCodes";

interface ChangePhoneModalProps {
    visible?: boolean;
    onClose: () => void;
}

interface PhoneFormProps {
    phone: string;
}

const SetPhoneFormSchema = yup.object().shape({
    phone: yup.string().matches(/^[0-9]\d{8}$/, "Please enter a valid phone number.").required(),
});

const ChangePhoneModal: FC<ChangePhoneModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useChangePhoneModalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectUserIsLoading);
    const [countryCode, setCountryCode] = useState<string>("");
    const {control, register, handleSubmit, watch, formState: {errors}, getValues} = useForm<PhoneFormProps>({
        resolver: yupResolver(SetPhoneFormSchema),
        mode: "onChange",
    });
    const phoneCode = getPhoneCode(myProfile);

    useEffect(() => {
        if (myProfile) {
            setCountryCode(getCountryCode(myProfile));
        }
    }, []);

    const onSubmit = (data: PhoneFormProps): void => {
        dispatch(updatePhone({countryCode, phone: parseInt(data.phone)}));
    };

    const changeCountryCode = (event: ChangeEvent<{ value: unknown }>): void => {
        setCountryCode(event.target.value as string);
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            transitionDuration={0}
            open={visible}
            onClose={onClose}
            className={classes.dialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent className={classes.content}>
                <div className={classes.logoIcon}>
                    {TweetIcon}
                </div>
                <div>
                    <Typography component={"div"} className={classes.title}>
                        Change phone
                    </Typography>
                    <Typography component={"div"} className={classNames(classes.text, classes.textSecondary)}>
                        {`Your current phone number is ${phoneCode !== "" ? phoneCode : "none"}${myProfile?.phone}. What would you like to update it to?`}
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
                                value={countryCode}
                                onChange={changeCountryCode}
                                label="Country code"
                                fullWidth
                            >
                                <option aria-label="None"/>
                                {countryCodes()}
                            </FilledSelect>
                        </FormControl>
                    </div>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}}) => (
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
                        <Typography component={"span"} className={classNames(classes.text, classes.textPrimary)}>
                            Let people who have your phone number find and connect with you on Twitter. <a
                            href="https://help.twitter.com/safety-and-security/email-and-phone-discoverability-settings"
                            target={"_blank"} className={classes.link}>Learn more</a>
                        </Typography>
                        <span><Checkbox/></span>
                    </div>
                    <div className={classes.footer}>
                        <Button
                            color="primary"
                            variant={(!getValues("phone") || !!errors.phone) ? "outlined" : "contained"}
                            type="submit"
                            fullWidth
                        >
                            {(!getValues("phone") || !!errors.phone) ? "Cancel" : "Next"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePhoneModal;

const countryCodes = (): JSX.Element => {
    return (
        <>
            <option value="AF">+93 Afghanistan</option>
            <option value="AL">+355 Albania</option>
            <option value="DZ">+213 Algeria</option>
            <option value="AS">+1 American Samoa</option>
            <option value="AD">+376 Andorra</option>
            <option value="AO">+244 Angola</option>
            <option value="AI">+1 Anguilla</option>
            <option value="AG">+1 Antigua and Barbuda</option>
            <option value="AR">+54 Argentina</option>
            <option value="AM">+374 Armenia</option>
            <option value="AW">+297 Aruba</option>
            <option value="AU">+61 Australia</option>
            <option value="AT">+43 Austria</option>
            <option value="AZ">+994 Azerbaijan</option>
            <option value="BS">+1 Bahamas</option>
            <option value="BH">+973 Bahrain</option>
            <option value="BD">+880 Bangladesh</option>
            <option value="BB">+1 Barbados</option>
            <option value="BY">+375 Belarus</option>
            <option value="BE">+32 Belgium</option>
            <option value="BZ">+501 Belize</option>
            <option value="BJ">+229 Benin</option>
            <option value="BM">+1 Bermuda</option>
            <option value="BT">+975 Bhutan</option>
            <option value="BO">+591 Bolivia</option>
            <option value="BQ">+599 Bonaire, Sint Eustatius and Saba</option>
            <option value="BA">+387 Bosnia and Herzegovina</option>
            <option value="BW">+267 Botswana</option>
            <option value="BR">+55 Brazil</option>
            <option value="VG">+1 British Virgin Islands</option>
            <option value="BN">+673 Brunei</option>
            <option value="BG">+359 Bulgaria</option>
            <option value="BF">+226 Burkina Faso</option>
            <option value="BI">+257 Burundi</option>
            <option value="KH">+855 Cambodia</option>
            <option value="CM">+237 Cameroon</option>
            <option value="CA">+1 Canada</option>
            <option value="CV">+238 Cape Verde</option>
            <option value="KY">+1 Cayman Islands</option>
            <option value="CF">+236 Central African Republic</option>
            <option value="TD">+235 Chad</option>
            <option value="CL">+56 Chile</option>
            <option value="CN">+86 China</option>
            <option value="CO">+57 Colombia</option>
            <option value="KM">+269 Comoros</option>
            <option value="CG">+242 Congo</option>
            <option value="CK">+682 Cook Islands</option>
            <option value="CR">+506 Costa Rica</option>
            <option value="HR">+385 Croatia</option>
            <option value="CU">+53 Cuba</option>
            <option value="CW">+599 Curaçao</option>
            <option value="CY">+357 Cyprus</option>
            <option value="CZ">+420 Czech Republic</option>
            <option value="CI">+225 Côte d'Ivoire</option>
            <option value="DK">+45 Denmark</option>
            <option value="DJ">+253 Djibouti</option>
            <option value="DM">+1 Dominica</option>
            <option value="DO">+1 Dominican Republic</option>
            <option value="EC">+593 Ecuador</option>
            <option value="EG">+20 Egypt</option>
            <option value="SV">+503 El Salvador</option>
            <option value="GQ">+240 Equatorial Guinea</option>
            <option value="ER">+291 Eritrea</option>
            <option value="EE">+372 Estonia</option>
            <option value="ET">+251 Ethiopia</option>
            <option value="FK">+500 Falkland Islands</option>
            <option value="FO">+298 Faroe Islands</option>
            <option value="FJ">+679 Fiji</option>
            <option value="FI">+358 Finland</option>
            <option value="FR">+33 France</option>
            <option value="GF">+594 French Guiana</option>
            <option value="PF">+689 French Polynesia</option>
            <option value="GA">+241 Gabon</option>
            <option value="GM">+220 Gambia</option>
            <option value="GE">+995 Georgia</option>
            <option value="DE">+49 Germany</option>
            <option value="GH">+233 Ghana</option>
            <option value="GI">+350 Gibraltar</option>
            <option value="GR">+30 Greece</option>
            <option value="GL">+299 Greenland</option>
            <option value="GD">+1 Grenada</option>
            <option value="GP">+590 Guadeloupe</option>
            <option value="GU">+1 Guam</option>
            <option value="GT">+502 Guatemala</option>
            <option value="GN">+224 Guinea</option>
            <option value="GW">+245 Guinea-Bissau</option>
            <option value="GY">+592 Guyana</option>
            <option value="HT">+509 Haiti</option>
            <option value="HN">+504 Honduras</option>
            <option value="HK">+852 Hong Kong</option>
            <option value="HU">+36 Hungary</option>
            <option value="IS">+354 Iceland</option>
            <option value="IN">+91 India</option>
            <option value="ID">+62 Indonesia</option>
            <option value="IR">+98 Iran</option>
            <option value="IQ">+964 Iraq</option>
            <option value="IE">+353 Ireland</option>
            <option value="IM">+44 Isle Of Man</option>
            <option value="IL">+972 Israel</option>
            <option value="IT">+39 Italy</option>
            <option value="JM">+1 Jamaica</option>
            <option value="JP">+81 Japan</option>
            <option value="JE">+44 Jersey</option>
            <option value="JO">+962 Jordan</option>
            <option value="KZ">+7 Kazakhstan</option>
            <option value="KE">+254 Kenya</option>
            <option value="KI">+686 Kiribati</option>
            <option value="KW">+965 Kuwait</option>
            <option value="KG">+996 Kyrgyzstan</option>
            <option value="LA">+856 Laos</option>
            <option value="LV">+371 Latvia</option>
            <option value="LB">+961 Lebanon</option>
            <option value="LS">+266 Lesotho</option>
            <option value="LR">+231 Liberia</option>
            <option value="LY">+218 Libya</option>
            <option value="LI">+423 Liechtenstein</option>
            <option value="LT">+370 Lithuania</option>
            <option value="LU">+352 Luxembourg</option>
            <option value="MO">+853 Macao</option>
            <option value="MK">+389 Macedonia</option>
            <option value="MG">+261 Madagascar</option>
            <option value="MW">+265 Malawi</option>
            <option value="MY">+60 Malaysia</option>
            <option value="MV">+960 Maldives</option>
            <option value="ML">+223 Mali</option>
            <option value="MT">+356 Malta</option>
            <option value="MQ">+596 Martinique</option>
            <option value="MR">+222 Mauritania</option>
            <option value="MU">+230 Mauritius</option>
            <option value="YT">+262 Mayotte</option>
            <option value="MX">+52 Mexico</option>
            <option value="FM">+691 Micronesia</option>
            <option value="MD">+373 Moldova</option>
            <option value="MC">+377 Monaco</option>
            <option value="MN">+976 Mongolia</option>
            <option value="ME">+382 Montenegro</option>
            <option value="MS">+1 Montserrat</option>
            <option value="MA">+212 Morocco</option>
            <option value="MZ">+258 Mozambique</option>
            <option value="MM">+95 Myanmar</option>
            <option value="NA">+264 Namibia</option>
            <option value="NR">+674 Nauru</option>
            <option value="NP">+977 Nepal</option>
            <option value="NL">+31 Netherlands</option>
            <option value="NC">+687 New Caledonia</option>
            <option value="NZ">+64 New Zealand</option>
            <option value="NI">+505 Nicaragua</option>
            <option value="NE">+227 Niger</option>
            <option value="NG">+234 Nigeria</option>
            <option value="NF">+672 Norfolk Island</option>
            <option value="MP">+1 Northern Mariana Islands</option>
            <option value="NO">+47 Norway</option>
            <option value="OM">+968 Oman</option>
            <option value="PK">+92 Pakistan</option>
            <option value="PS">+970 Palestine</option>
            <option value="PA">+507 Panama</option>
            <option value="PG">+675 Papua New Guinea</option>
            <option value="PY">+595 Paraguay</option>
            <option value="PE">+51 Peru</option>
            <option value="PH">+63 Philippines</option>
            <option value="PL">+48 Poland</option>
            <option value="PT">+351 Portugal</option>
            <option value="PR">+1 Puerto Rico</option>
            <option value="QA">+974 Qatar</option>
            <option value="RE">+262 Reunion</option>
            <option value="RO">+40 Romania</option>
            <option value="RU">+7 Russia</option>
            <option value="RW">+250 Rwanda</option>
            <option value="KN">+1 Saint Kitts And Nevis</option>
            <option value="LC">+1 Saint Lucia</option>
            <option value="MF">+590 Saint Martin</option>
            <option value="VC">+1 Saint Vincent And The Grenadines</option>
            <option value="WS">+685 Samoa</option>
            <option value="SM">+378 San Marino</option>
            <option value="ST">+239 Sao Tome And Principe</option>
            <option value="SA">+966 Saudi Arabia</option>
            <option value="SN">+221 Senegal</option>
            <option value="RS">+381 Serbia</option>
            <option value="SC">+248 Seychelles</option>
            <option value="SL">+232 Sierra Leone</option>
            <option value="SG">+65 Singapore</option>
            <option value="SX">+1 Sint Maarten (Dutch part)</option>
            <option value="SK">+421 Slovakia</option>
            <option value="SI">+386 Slovenia</option>
            <option value="SB">+677 Solomon Islands</option>
            <option value="SO">+252 Somalia</option>
            <option value="ZA">+27 South Africa</option>
            <option value="KR">+82 South Korea</option>
            <option value="SS">+211 South Sudan</option>
            <option value="ES">+34 Spain</option>
            <option value="LK">+94 Sri Lanka</option>
            <option value="SR">+597 Suriname</option>
            <option value="SZ">+268 Swaziland</option>
            <option value="SE">+46 Sweden</option>
            <option value="CH">+41 Switzerland</option>
            <option value="TW">+886 Taiwan</option>
            <option value="TJ">+992 Tajikistan</option>
            <option value="TZ">+255 Tanzania</option>
            <option value="TH">+66 Thailand</option>
            <option value="CD">+243 The Democratic Republic Of Congo</option>
            <option value="TL">+670 Timor-Leste</option>
            <option value="TG">+228 Togo</option>
            <option value="TO">+676 Tonga</option>
            <option value="TT">+1 Trinidad and Tobago</option>
            <option value="TN">+216 Tunisia</option>
            <option value="TR">+90 Turkey</option>
            <option value="TM">+993 Turkmenistan</option>
            <option value="TC">+1 Turks And Caicos Islands</option>
            <option value="TV">+688 Tuvalu</option>
            <option value="VI">+1 U.S. Virgin Islands</option>
            <option value="UG">+256 Uganda</option>
            <option value="UA">+380 Ukraine</option>
            <option value="AE">+971 United Arab Emirates</option>
            <option value="GB">+44 United Kingdom</option>
            <option value="US">+1 United States</option>
            <option value="UY">+598 Uruguay</option>
            <option value="UZ">+998 Uzbekistan</option>
            <option value="VU">+678 Vanuatu</option>
            <option value="VE">+58 Venezuela</option>
            <option value="VN">+84 Vietnam</option>
            <option value="XK">+383 XK</option>
            <option value="YE">+967 Yemen</option>
            <option value="ZM">+260 Zambia</option>
            <option value="ZW">+263 Zimbabwe</option>
        </>
    );
};
