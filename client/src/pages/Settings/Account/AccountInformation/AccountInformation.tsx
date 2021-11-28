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
                            <Typography component={"div"} className={classes.title}>
                                Username
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
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
                            <Typography component={"div"} className={classes.title}>
                                Phone
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
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
                            <Typography component={"div"} className={classes.title}>
                                Email
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                {myProfile?.email}
                            </Typography>
                        </div>
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <div className={classes.informationItem}>
                    <Typography component={"div"} className={classes.title}>
                        Verified
                    </Typography>
                    <Typography component={"div"} className={classes.text}>
                        No. <span className={classes.link}>Request Verification</span>
                    </Typography>
                </div>
                <Divider/>
                <NavLink to={"/settings/privacy_and_safety/audience"}>
                    <ListItem>
                        <div>
                            <Typography component={"div"} className={classes.title}>
                                Protected Tweets
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                {myProfile?.mutedDirectMessages ? "Yes" : "No"}
                            </Typography>
                        </div>
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <div className={classes.informationItem}>
                    <Typography component={"div"} className={classes.title}>
                        Account creation
                    </Typography>
                    <Typography component={"div"} className={classes.text}>
                        {formatScheduleDate(new Date(myProfile?.registrationDate!))}
                    </Typography>
                </div>
                <Divider/>
                <NavLink to={"/settings/info/country"}>
                    <ListItem>
                        <div>
                            <Typography component={"div"} className={classes.title}>
                                Country
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
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
                            <Typography component={"div"} className={classes.title}>
                                Languages
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
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
                            <Typography component={"div"} className={classes.title}>
                                Gender
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                {myProfile?.gender}
                            </Typography>
                        </div>
                        <div className={classes.arrowIcon}>
                            {ArrowRightIcon}
                        </div>
                    </ListItem>
                </NavLink>
                <div className={classes.informationItem}>
                    <Typography component={"div"} className={classes.title}>
                        Birth date
                    </Typography>
                    <Typography component={"div"} className={classes.text}>
                        Add your date of birth to your <span className={classes.link}>profile</span>.
                    </Typography>
                </div>
                <Divider/>
                <NavLink to={"/settings/info/age"}>
                    <ListItem>
                        <div>
                            <Typography component={"div"} className={classes.title}>
                                Age
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
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
