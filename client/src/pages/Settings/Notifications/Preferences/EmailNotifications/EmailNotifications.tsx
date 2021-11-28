import React, {FC, ReactElement, useState} from 'react';
import {Checkbox, Divider, Radio, Switch, Typography} from "@material-ui/core";

import {useEmailNotificationsStyles} from "./EmailNotificationsStyles";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

const EmailNotifications: FC = (): ReactElement => {
    const classes = useEmailNotificationsStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Periodically");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.itemTitle}>
                    Email notifications
                    <span className={classes.switch}>
                        <Switch defaultChecked/>
                    </span>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Get emails to find out what’s going on when you’re not on Twitter. You can turn them off anytime.
                    <a
                        href={"https://help.twitter.com/managing-your-account/updating-email-preferences#tweet-activity"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Related to you and your Tweets
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>New notifications</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Direct messages</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Tweets emailed to you</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.subtitle}>
                    Top Tweets and Stories
                </Typography>
                <div className={classes.emailNotificationsItemWrapper}>
                    <Typography component={"span"}>
                        Daily
                    </Typography>
                    <Radio
                        checked={selectedValue === "Daily"}
                        onChange={handleChange}
                        value="Daily"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Daily"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={classes.emailNotificationsItemWrapper}>
                    <Typography component={"span"}>
                        Weekly
                    </Typography>
                    <Radio
                        checked={selectedValue === "Weekly"}
                        onChange={handleChange}
                        value="Weekly"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Weekly"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={classes.emailNotificationsItemWrapper}>
                    <Typography component={"span"}>
                        Periodically
                    </Typography>
                    <Radio
                        checked={selectedValue === "Periodically"}
                        onChange={handleChange}
                        value="Periodically"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Periodically"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={classes.emailNotificationsItemWrapper}>
                    <Typography component={"span"}>
                        Off
                    </Typography>
                    <Radio
                        checked={selectedValue === "Off"}
                        onChange={handleChange}
                        value="Off"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Off"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Updates about the performance of your Tweets</span>
                    <Checkbox/>
                </div>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    From Twitter
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>News about Twitter product and feature updates</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Tips on getting more out of Twitter</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Things you missed since you last logged into Twitter</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>News about Twitter on partner products and other third party services</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Participation in Twitter research surveys</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Suggestions for recommended accounts</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Suggestions based on your recent follows</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Tips on Twitter business products</span>
                    <Checkbox checked={true}/>
                </div>
            </div>
        </>
    );
};

export default EmailNotifications;
