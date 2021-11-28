import React, {FC, ReactElement, useState} from 'react';

import {usePhotoTaggingStyles} from "./PhotoTaggingStyles";
import {Divider, Radio, Switch, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

const PhotoTagging: FC = (): ReactElement => {
    const classes = usePhotoTaggingStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Anyone");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Photo tagging
                    <span className={classes.switch}>
                        <Switch defaultChecked/>
                    </span>
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    Allow people to tag you in their photos and receive notifications when they do so.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <div className={classes.photoTaggingItemWrapper}>
                    <Typography component={"span"}>
                        Anyone can tag you
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
                <div className={classes.photoTaggingItemWrapper}>
                    <Typography component={"span"}>
                        Only people you follow can tag you
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

export default PhotoTagging;
