import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Link as MuiLink, List, ListItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { ArrowRightIcon } from "../../../../icons";
import {
    selectUserDataIsPrivateProfile,
    selectUserProfileCountryCode,
    selectUserProfileEmail,
    selectUserProfileGender,
    selectUserProfileLanguage,
    selectUserProfilePhone,
    selectUserProfileRegistrationDate,
    selectUserProfileUsername
} from "../../../../store/ducks/user/selectors";
import { formatScheduleDate } from "../../../../util/format-date-helper";
import { getCountry, getPhoneCode } from "../../../../util/country-code-helper";
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
    const countryCode = useSelector(selectUserProfileCountryCode);
    const phone = useSelector(selectUserProfilePhone);
    const email = useSelector(selectUserProfileEmail);
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const registrationDate = useSelector(selectUserProfileRegistrationDate);
    const language = useSelector(selectUserProfileLanguage);
    const gender = useSelector(selectUserProfileGender);

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    return (
        <div className={globalClasses.listItemWrapper}>
            <List>
                <Link to={SETTINGS_INFO_USERNAME}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Username
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
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
                            <Typography variant={"body1"} component={"div"}>
                                Phone
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {`${getPhoneCode(countryCode)}${phone}`}
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
                            <Typography variant={"body1"} component={"div"}>
                                Email
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {email}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        Verified
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {"No. "}
                        <MuiLink variant="subtitle2">
                            Request Verification
                        </MuiLink>
                    </Typography>
                </div>
                <Divider />
                <Link to={SETTINGS_PRIVACY_AND_SAFETY_AUDIENCE}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Protected Tweets
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {isPrivateProfile ? "Yes" : "No"}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        Account creation
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {formatScheduleDate(new Date(registrationDate!))}
                    </Typography>
                </div>
                <Divider />
                <Link to={SETTINGS_INFO_COUNTRY}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Country
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {getCountry(countryCode)}
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
                            <Typography variant={"body1"} component={"div"}>
                                Languages
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
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
                            <Typography variant={"body1"} component={"div"}>
                                Gender
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {gender}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </Link>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        Birth date
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {"Add your date of birth to your "}
                        <MuiLink variant="subtitle2">
                            profile.
                        </MuiLink>
                    </Typography>
                </div>
                <Divider />
                <Link to={SETTINGS_INFO_AGE}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Age
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
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
