import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, List, ListItem, Typography} from "@material-ui/core";
import {NavLink} from 'react-router-dom';

import {useAccountInformationStyles} from "./AccountInformationStyles";
import {ArrowRightIcon} from "../../../../icons";
import {selectUserData} from "../../../../store/ducks/user/selectors";
import {formatScheduleDate} from "../../../../util/formatDate";
import {getCountry, getPhoneCode} from "../../../../util/countryCodes";
import {fetchUserData} from "../../../../store/ducks/user/actionCreators";

const AccountInformation: FC = (): ReactElement => {
    const classes = useAccountInformationStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    return (
        <div className={classes.listWrapper}>
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
                        <div className={classes.arrowIcon}>
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
                                {`${getPhoneCode(myProfile)}${myProfile?.phone}`}
                            </Typography>
                        </div>
                        <div className={classes.arrowIcon}>
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
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <div className={classes.informationItem}>
                    <Typography variant={"body1"} component={"div"}>
                        Verified
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        No. <span className={classes.link}>Request Verification</span>
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
                                {myProfile?.mutedDirectMessages ? "Yes" : "No"}
                            </Typography>
                        </div>
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <div className={classes.informationItem}>
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
                                {getCountry(myProfile)}
                            </Typography>
                        </div>
                        <div className={classes.arrowIcon}>
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
                        <div className={classes.arrowIcon}>
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
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <div className={classes.informationItem}>
                    <Typography variant={"body1"} component={"div"}>
                        Birth date
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        Add your date of birth to your <span className={classes.link}>profile</span>.
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
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
};

export default AccountInformation;
