import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link as MuiLink, List, ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { CalendarIcon, LinkIcon, LocationIcon } from "../../../icons";
import {
    selectUserProfileBirthday,
    selectUserProfileId,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileLocation,
    selectUserProfileRegistrationDate,
    selectUserProfileWebsite
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";
import { formatRegistrationDate } from "../../../util/format-date-helper";

const UserDetails = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const userProfileId = useSelector(selectUserProfileId);
    const isMyProfileBlocked = useSelector(selectUserProfileIsMyProfileBlocked);
    const location = useSelector(selectUserProfileLocation);
    const website = useSelector(selectUserProfileWebsite);
    const birthday = useSelector(selectUserProfileBirthday);
    const registrationDate = useSelector(selectUserProfileRegistrationDate);
    const { t } = useTranslation();

    return (
        <>
            {!userProfileId && (
                <div className={classes.skeletonDetails}>
                    <Skeleton component="span" variant="text" width={80} />
                    <Skeleton component="span" variant="text" width={150} />
                    <Skeleton component="span" variant="text" width={150} />
                </div>
            )}
            {!isMyProfileBlocked && (
                <List>
                    {location && (
                        <ListItem>
                            <>{LocationIcon}</>
                            <Typography variant="subtitle1" component="span">
                                {location}
                            </Typography>
                        </ListItem>
                    )}
                    {website && (
                        <ListItem>
                            <>{LinkIcon}</>
                            {/* TODO link to website */}
                            <MuiLink href={website} variant="subtitle1" target="_blank" rel="noopener">
                                {website}
                            </MuiLink>
                        </ListItem>
                    )}
                    {birthday && (
                        <ListItem>
                            <Typography variant="subtitle1" component="span">
                                {t("DATE_OF_BIRTH", { birthday, defaultValue: `Date of Birth: ${birthday}`})}
                            </Typography>
                        </ListItem>
                    )}
                    {registrationDate && (
                        <ListItem>
                            <>{CalendarIcon}</>
                            <Typography variant="subtitle1" component="span">
                                {t("JOINED", {
                                    registrationDate: formatRegistrationDate(registrationDate),
                                    defaultValue: `Joined: ${formatRegistrationDate(registrationDate)}`})}
                            </Typography>
                        </ListItem>
                    )}
                </List>
            )}
        </>
    );
});

export default UserDetails;
