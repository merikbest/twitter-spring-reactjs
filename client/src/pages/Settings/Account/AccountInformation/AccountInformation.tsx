import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, Link as MuiLink, List, ListItem, Typography} from "@material-ui/core";
import {NavLink} from 'react-router-dom';

import {ArrowRightIcon} from "../../../../icons";
import {selectUserData} from "../../../../store/ducks/user/selectors";
import {formatScheduleDate} from "../../../../util/formatDate";
import {getCountry, getPhoneCode} from "../../../../util/countryCodes";
import {fetchUserData} from "../../../../store/ducks/user/actionCreators";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const AccountInformation: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    return (
        <div className={globalClasses.listItemWrapper}>
            <List>
                <NavLink to={"/settings/info/username"}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Username
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                @{myProfile?.username}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <NavLink to={"/settings/info/phone"}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Phone
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {`${getPhoneCode(myProfile?.countryCode)}${myProfile?.phone}`}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <NavLink to={"/settings/info/email"}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Email
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {myProfile?.email}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
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
                <Divider/>
                <NavLink to={"/settings/privacy_and_safety/audience"}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Protected Tweets
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {myProfile?.isPrivateProfile ? "Yes" : "No"}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"body1"} component={"div"}>
                        Account creation
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {formatScheduleDate(new Date(myProfile?.registrationDate!))}
                    </Typography>
                </div>
                <Divider/>
                <NavLink to={"/settings/info/country"}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Country
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {getCountry(myProfile?.countryCode)}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <NavLink to={"/settings/accessibility_display_and_languages/languages"}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Languages
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {myProfile?.language}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <NavLink to={"/settings/info/gender"}>
                    <ListItem>
                        <div>
                            <Typography variant={"body1"} component={"div"}>
                                Gender
                            </Typography>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {myProfile?.gender}
                            </Typography>
                        </div>
                        <div className={globalClasses.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
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
                <Divider/>
                <NavLink to={"/settings/info/age"}>
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
                </NavLink>
            </List>
        </div>
    );
};

export default withDocumentTitle(AccountInformation);
