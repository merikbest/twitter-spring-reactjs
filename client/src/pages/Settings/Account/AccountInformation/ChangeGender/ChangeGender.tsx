import React, {FC, ReactElement, useState} from 'react';
import {Button, Radio, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

import {useChangeGenderStyles} from "./ChangeGenderStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";

const ChangeGender: FC = (): ReactElement => {
    const classes = useChangeGenderStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Female");
    const [otherGender, setOtherGender] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <Typography component={"div"} className={classes.text}>
                If you haven’t already specified a gender, this is the one associated with your account based on
                your profile and activity. This information won’t be displayed publicly.
            </Typography>
            <div className={classes.divider}/>
            <div className={classes.genderInfoWrapper}>
                <div className={classes.genderItemWrapper}>
                    <Typography component={"span"}>
                        Female
                    </Typography>
                    <Radio
                        checked={selectedValue === "Female"}
                        onChange={handleChange}
                        value="Female"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Female"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={classes.genderItemWrapper}>
                    <Typography component={"span"}>
                        Male
                    </Typography>
                    <Radio
                        checked={selectedValue === "Male"}
                        onChange={handleChange}
                        value="Male"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Male"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                <div className={classes.genderItemWrapper}>
                    <Typography component={"span"}>
                        Other
                    </Typography>
                    <Radio
                        checked={selectedValue === "Other"}
                        onChange={handleChange}
                        value="Other"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Other"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                {(selectedValue === "Other") && (
                    <div className={classes.textFieldWrapper}>
                        <ChangeInfoTextField
                            label="Gender"
                            type="text"
                            variant="filled"
                            value={otherGender}
                            fullWidth
                        />
                    </div>
                )}
            </div>
            <div className={classes.divider}/>
            <div className={classes.buttonWrapper}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default ChangeGender;
