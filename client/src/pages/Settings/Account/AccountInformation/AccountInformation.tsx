import React, {FC, ReactElement} from 'react';
import {List, ListItem, Typography} from "@material-ui/core";
import {NavLink} from 'react-router-dom';

import {useAccountInformationStyles} from "./AccountInformationStyles";
import {ArrowRightIcon} from "../../../../icons";

const AccountInformation: FC = (): ReactElement => {
    const classes = useAccountInformationStyles();

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
                                @Vbhjckfd1
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
                                +380123456789
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
                                test@test.com
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
                <div className={classes.divider}/>
                <ListItem>
                    <div>
                        <Typography component={"div"} className={classes.title}>
                            Protected Tweets
                        </Typography>
                        <Typography component={"div"} className={classes.text}>
                            No
                        </Typography>
                    </div>
                    <div className={classes.arrowIcon}>
                        {ArrowRightIcon}
                    </div>
                </ListItem>
                <div className={classes.informationItem}>
                    <Typography component={"div"} className={classes.title}>
                        Account creation
                    </Typography>
                    <Typography component={"div"} className={classes.text}>
                        Jun 26, 2016, 7:32:47 PM
                    </Typography>
                </div>
                <div className={classes.divider}/>
                <NavLink to={"/settings/info/country"}>
                    <ListItem>
                        <div>
                            <Typography component={"div"} className={classes.title}>
                                Country
                            </Typography>
                            <Typography component={"div"} className={classes.text}>
                                England
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
                                English
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
                                Male
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
                <div className={classes.divider}/>
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
