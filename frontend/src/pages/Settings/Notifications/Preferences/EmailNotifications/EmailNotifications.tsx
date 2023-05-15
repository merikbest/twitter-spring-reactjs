import React, { FC, ReactElement, useState } from "react";
import { Checkbox, Divider, Link as MuiLink, Radio, Switch, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { TWEET_ACTIVITY } from "../../../../../constants/url-constants";

const EmailNotifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const [selectedValue, setSelectedValue] = useState<string>("Periodically");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h6"} component={"div"} style={{ paddingBottom: 4 }}>
                    Email notifications
                    <span className={globalClasses.switch}>
                        <Switch defaultChecked />
                    </span>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {"Get emails to find out what’s going on when you’re not on Twitter. You can turn them off anytime. "}
                    <MuiLink href={TWEET_ACTIVITY} variant="subtitle2" target="_blank" rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Related to you and your Tweets
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        New notifications
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Direct messages
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Tweets emailed to you
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Top Tweets and Stories
                </Typography>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Daily
                    </Typography>
                    <Radio
                        checked={selectedValue === "Daily"}
                        onChange={handleChange}
                        value="Daily"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Daily" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Weekly
                    </Typography>
                    <Radio
                        checked={selectedValue === "Weekly"}
                        onChange={handleChange}
                        value="Weekly"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Weekly" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Periodically
                    </Typography>
                    <Radio
                        checked={selectedValue === "Periodically"}
                        onChange={handleChange}
                        value="Periodically"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Periodically" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Off
                    </Typography>
                    <Radio
                        checked={selectedValue === "Off"}
                        onChange={handleChange}
                        value="Off"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Off" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Updates about the performance of your Tweets
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    From Twitter
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        News about Twitter product and feature updates
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Tips on getting more out of Twitter
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Things you missed since you last logged into Twitter
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        News about Twitter on partner products and other third party services
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Participation in Twitter research surveys
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Suggestions for recommended accounts
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Suggestions based on your recent follows
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Tips on Twitter business products
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
        </>
    );
};

export default withDocumentTitle(EmailNotifications)("Email notifications");
