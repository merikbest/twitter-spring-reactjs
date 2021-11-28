import React, {FC, ReactElement, useState} from 'react';
import {Divider, Radio, Switch, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

import {useTweetDeckTeamsStyles} from "./TweetDeckTeamsStyles";

const TweetDeckTeams: FC = (): ReactElement => {
    const classes = useTweetDeckTeamsStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Anyone");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Invite anyone to Tweet from this account using the Teams feature in TweetDeck.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Turn on TweetDeck Teams
                    <span className={classes.switch}>
                                <Switch defaultChecked/>
                            </span>
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    When this setting is on, you can invite anyone to Tweet from this account using TweetDeck
                    Teams. <a href={"https://help.twitter.com/using-twitter/tweetdeck-teams"} target="_blank"
                              className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <div className={classes.tweetDeckItemWrapper}>
                    <Typography component={"span"}>
                        Allow anyone to add you to their team
                    </Typography>
                    <Radio
                        checked={selectedValue === "Anyone"}
                        onChange={handleChange}
                        value="Anyone"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Anyone"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={classes.tweetDeckItemWrapper}>
                    <Typography component={"span"}>
                        Only allow people you follow to add you to their team
                    </Typography>
                    <Radio
                        checked={selectedValue === "Others"}
                        onChange={handleChange}
                        value="Others"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Others"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
            </div>
        </>
    );
};

export default TweetDeckTeams;
