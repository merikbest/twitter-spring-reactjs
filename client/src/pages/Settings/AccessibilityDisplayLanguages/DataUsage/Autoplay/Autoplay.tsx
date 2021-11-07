import React, {FC, ReactElement, useState} from 'react';

import {useAutoplayStyles} from "./AutoplayStyles";
import {Radio, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

const Autoplay: FC = (): ReactElement => {
    const classes = useAutoplayStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Never");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.subtitle}>
                    Autoplay
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    Select whether videos and GIFs should play automatically on this device. <a
                    href={"https://help.twitter.com/safety-and-security/public-and-protected-tweets"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
                <div className={classes.autoplayItemWrapper}>
                    <Typography component={"span"}>
                        On cellular or Wi-Fi
                    </Typography>
                    <Radio
                        checked={selectedValue === "Wi-Fi"}
                        onChange={handleChange}
                        value="Wi-Fi"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Wi-Fi"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={classes.autoplayItemWrapper}>
                    <Typography component={"span"}>
                        Never
                    </Typography>
                    <Radio
                        checked={selectedValue === "Never"}
                        onChange={handleChange}
                        value="Never"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Never"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
            </div>
        </>
    );
};

export default Autoplay;
