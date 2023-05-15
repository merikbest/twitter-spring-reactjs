import React, { FC, ReactElement, useState } from "react";
import { Divider, Link as MuiLink, Radio, Switch, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";

import { useTweetDeckTeamsStyles } from "./TweetDeckTeamsStyles";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { TWEETDECK_TEAMS } from "../../../../constants/url-constants";

const TweetDeckTeams: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useTweetDeckTeamsStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Anyone");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Invite anyone to Tweet from this account using the Teams feature in TweetDeck.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h6"} component={"div"} className={classes.title}>
                    Turn on TweetDeck Teams
                    <span className={classes.switch}>
                        <Switch defaultChecked />
                    </span>
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    {"When this setting is on, you can invite anyone to Tweet from this account using TweetDeck Teams. "}
                    <MuiLink href={TWEETDECK_TEAMS} variant="subtitle2" target="_blank" rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Allow anyone to add you to their team
                    </Typography>
                    <Radio
                        checked={selectedValue === "Anyone"}
                        onChange={handleChange}
                        value="Anyone"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Anyone" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Only allow people you follow to add you to their team
                    </Typography>
                    <Radio
                        checked={selectedValue === "Others"}
                        onChange={handleChange}
                        value="Others"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Others" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
            </div>
        </>
    );
};

export default withDocumentTitle(TweetDeckTeams)("TweetDeck Teams");
