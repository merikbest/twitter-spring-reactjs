import React, {FC, ReactElement, useState} from 'react';
import {Divider, Radio, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

import {useDisplayStyles} from "./DisplayStyles";
import {CheckIcon, TweetIcon, VerifiedIcon} from "../../../../icons";

enum ColorScheme {
    BLUE = "blue",
    YELLOW = "yellow",
    CRIMSON = "crimson",
    VIOLET = "violet",
    ORANGE = "orange",
    GREEN = "green",
}

interface DisplayProps {
    changeBackgroundColor: (background: string) => void;
}

const Display: FC<DisplayProps> = ({changeBackgroundColor}): ReactElement => {
    const classes = useDisplayStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Default");
    const [selectedColor, setSelectedColor] = useState<ColorScheme>(ColorScheme.BLUE);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
        changeBackgroundColor(event.target.value);
    };

    const handleClick = (value: string): void => {
        setSelectedValue(value);
        changeBackgroundColor(value);
    };

    const ColorSelector: FC<{color: ColorScheme}> = ({color}): JSX.Element => {
        return (
            <div
                id={color}
                className={classes.colorItem}
                onClick={() => setSelectedColor(color)}
            >
                {(color === selectedColor) && (
                    <span className={classes.checkIcon}>
                        {CheckIcon}
                    </span>
                )}
            </div>
        );
    };

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage your font size, color, and background. These settings affect all the Twitter accounts on this
                    browser.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.tweetInfoWrapper}>
                    <div>
                        <div className={classes.tweetIconWrapper}>
                        <span className={classes.tweetIcon}>
                            {TweetIcon}
                        </span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Typography component={"span"} className={classes.tweetTitle}>
                                Twitter
                            </Typography>
                            <span className={classes.tweetVerifiedIcon}>
                                {VerifiedIcon}
                            </span>
                            <Typography component={"span"} className={classes.tweetInfoText}>
                                @Twitter
                            </Typography>
                            <Typography component={"span"} className={classes.tweetInfoText}>
                                {" · 31m"}
                            </Typography>
                        </div>
                        <Typography component={"div"} className={classes.tweetText}>
                            At the heart of Twitter are short messages called Tweets — just like this one — which can
                            include photos, videos, links, text, hashtags, and mentions like <span
                            className={classes.tweetLink}>@Twitter</span>
                        </Typography>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Font size
                </Typography>
                <div className={classes.stepperWrapper}>
                    <Typography id={"xs"} component={"span"} className={classes.tweetText}>
                        Aa
                    </Typography>
                    <span className={classes.stepper}>
                        <div id={"xs"} className={classes.stepperPoint}/>
                        <div id={"sm"} className={classes.stepperPoint}/>
                        <div id={"md"} className={classes.stepperPoint}/>
                        <div id={"lg"} className={classes.stepperPoint}/>
                        <div id={"xl"} className={classes.stepperPoint}/>
                    </span>
                    <Typography id={"xl"} component={"span"} className={classes.tweetText}>
                        Aa
                    </Typography>
                </div>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Color
                </Typography>
            </div>
            <div className={classes.colorWrapper}>
                <ColorSelector color={ColorScheme.BLUE}/>
                <ColorSelector color={ColorScheme.YELLOW}/>
                <ColorSelector color={ColorScheme.CRIMSON}/>
                <ColorSelector color={ColorScheme.VIOLET}/>
                <ColorSelector color={ColorScheme.ORANGE}/>
                <ColorSelector color={ColorScheme.GREEN}/>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Background
                </Typography>
            </div>
            <div className={classes.backgroundContainer}>
                <div className={classes.backgroundWrapper}>
                    <div id={"default"} className={classes.backgroundItem} onClick={() => handleClick("Default")}>
                        <div className={classes.backgroundItemWrapper}>
                            <Radio
                                checked={selectedValue === "Default"}
                                onChange={handleChange}
                                value="Default"
                                name="radio-buttons"
                                inputProps={{"aria-label": "Default"}}
                                icon={<RadioButtonUnchecked color={"primary"}/>}
                                checkedIcon={<CheckCircle color={"primary"}/>}
                                size="small"
                            />
                        </div>
                        <Typography component={"span"} className={classes.backgroundItemText}>
                            Default
                        </Typography>
                    </div>
                </div>
                <div className={classes.backgroundWrapper}>
                    <div id={"dim"} className={classes.backgroundItem} onClick={() => handleClick("Dim")}>
                        <div className={classes.backgroundItemWrapper}>
                            <Radio
                                checked={selectedValue === "Dim"}
                                onChange={handleChange}
                                value="Dim"
                                name="radio-buttons"
                                inputProps={{"aria-label": "Dim"}}
                                icon={<RadioButtonUnchecked color={"primary"}/>}
                                checkedIcon={<CheckCircle color={"primary"}/>}
                                size="small"
                            />
                        </div>
                        <Typography component={"span"} className={classes.backgroundItemText}>
                            Dim
                        </Typography>
                    </div>
                </div>
                <div className={classes.backgroundWrapper}>
                    <div id={"lights-out"} className={classes.backgroundItem} onClick={() => handleClick("Lights-out")}>
                        <div className={classes.backgroundItemWrapper}>
                            <Radio
                                checked={selectedValue === "Lights-out"}
                                onChange={handleChange}
                                value="Lights-out"
                                name="radio-buttons"
                                inputProps={{"aria-label": "Lights-out"}}
                                icon={<RadioButtonUnchecked color={"primary"}/>}
                                checkedIcon={<CheckCircle color={"primary"}/>}
                                size="small"
                            />
                        </div>
                        <Typography component={"span"} className={classes.backgroundItemText}>
                            Lights out
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Display;
