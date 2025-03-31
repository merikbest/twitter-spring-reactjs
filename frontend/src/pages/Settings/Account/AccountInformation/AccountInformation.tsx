import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Link as MuiLink, List, ListItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import {
    selectUserDataIsPrivateProfile,
    selectUserProfileCountry,
    selectUserProfileEmail,
    selectUserProfileGender,
    selectUserProfileLanguage,
    selectUserProfilePhoneNumber,
    selectUserProfilePhoneCode,
    selectUserProfileRegistrationDate,
    selectUserProfileUsername
} from "../../../../store/ducks/user/selectors";
import { formatScheduleDate } from "../../../../util/format-date-helper";
import { fetchUserData } from "../../../../store/ducks/user/actionCreators";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import {
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES,
    SETTINGS_INFO_AGE,
    SETTINGS_INFO_COUNTRY,
    SETTINGS_INFO_EMAIL,
    SETTINGS_INFO_GENDER,
    SETTINGS_INFO_PHONE,
    SETTINGS_INFO_USERNAME,
    SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE
} from "../../../../constants/path-constants";

const AccountInformation: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const username = useSelector(selectUserProfileUsername);
    const phoneCode = useSelector(selectUserProfilePhoneCode);
    const phoneNumber = useSelector(selectUserProfilePhoneNumber);
    const country = useSelector(selectUserProfileCountry);
    const email = useSelector(selectUserProfileEmail);
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const registrationDate = useSelector(selectUserProfileRegistrationDate);
    const language = useSelector(selectUserProfileLanguage);
    const gender = useSelector(selectUserProfileGender);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    return (
        <div className={globalClasses.listItemWrapper}>
            <List>
                <Link to={SETTINGS_INFO_USERNAME}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("USERNAME", { defaultValue: "Username" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                @{username}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_INFO_PHONE}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("PHONE", { defaultValue: "Phone" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {(phoneCode && phoneNumber) && `${phoneCode}${phoneNumber}`}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_INFO_EMAIL}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("EMAIL", { defaultValue: "Email" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {email}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant="body1" component="div">
                        {t("VERIFIED", { defaultValue: "Verified" })}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {t("NO", { defaultValue: "No" })}
                        {". "}
                        <MuiLink variant="subtitle2">
                            {t("REQUEST_VERIFICATION", { defaultValue: "Request Verification" })}
                        </MuiLink>
                    </Typography>
                </div>
                <Divider />
                <Link to={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("PROTECTED_TWEETS", { defaultValue: "Protected Tweets" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {isPrivateProfile
                                    ? t("YES", { defaultValue: "Yes" })
                                    : t("NO", { defaultValue: "No" })}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant="body1" component="div">
                        {t("ACCOUNT_CREATION", { defaultValue: "Account creation" })}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {formatScheduleDate(new Date(registrationDate!))}
                    </Typography>
                </div>
                <Divider />
                <Link to={SETTINGS_INFO_COUNTRY}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("COUNTRY", { defaultValue: "Country" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {country && country}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("LANGUAGES", { defaultValue: "Languages" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {language}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <Link to={SETTINGS_INFO_GENDER}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("GENDER", { defaultValue: "Gender" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {gender}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant="body1" component="div">
                        {t("BIRTH_DATE", { defaultValue: "Birth date" })}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        <Trans
                            i18nKey={t("ADD_YOUR_DATE_OF_BIRTH_TO_YOUR", {
                                defaultValue: "Add your date of birth to your profile."
                            })}
                            components={{ profileLink: <MuiLink variant="subtitle2" /> }}
                        />
                    </Typography>
                </div>
                <Divider />
                <Link to={SETTINGS_INFO_AGE}>
                    <ListItem>
                        <div>
                            <Typography variant="body1" component="div">
                                {t("AGE", { defaultValue: "Age" })}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                13-64
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
            </List>
        </div>
    );
};

export default withDocumentTitle(AccountInformation)("Account information");
