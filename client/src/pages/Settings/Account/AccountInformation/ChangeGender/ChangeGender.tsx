import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Divider, Radio, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

import {useChangeGenderStyles} from "./ChangeGenderStyles";
import {ChangeInfoTextField} from "../../../ChangeInfoTextField/ChangeInfoTextField";
import {setUserLoadingStatus, updateGender} from "../../../../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../../../../store/types";
import {selectUserData, selectUserIsLoading} from "../../../../../store/ducks/user/selectors";

const ChangeGender: FC = (): ReactElement => {
    const classes = useChangeGenderStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectUserIsLoading);
    const [selectedGender, setSelectedGender] = useState<string>("Female");
    const [otherGender, setOtherGender] = useState<string>("");

    useEffect(() => {
        if (myProfile) {
            if (myProfile.gender === "Female" || myProfile.gender === "Male") {
                setSelectedGender(myProfile.gender);
            } else {
                setOtherGender(myProfile?.gender ? myProfile.gender : "");
            }
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const handleSelectedGender = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedGender(event.target.value);
    };

    const handleChangeGender = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setOtherGender(event.currentTarget.value);
        }
    };

    const onSubmit = (): void => {
        if (otherGender !== "") {
            dispatch(updateGender({gender: otherGender}));
        } else {
            dispatch(updateGender({gender: selectedGender}));
        }
    };

    return (
        <>
            <Typography component={"div"} className={classes.text}>
                If you haven’t already specified a gender, this is the one associated with your account based on
                your profile and activity. This information won’t be displayed publicly.
            </Typography>
            <Divider/>
            <div className={classes.genderInfoWrapper}>
                <div className={classes.genderItemWrapper}>
                    <Typography component={"span"}>
                        Female
                    </Typography>
                    <Radio
                        checked={selectedGender === "Female"}
                        onChange={handleSelectedGender}
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
                        checked={selectedGender === "Male"}
                        onChange={handleSelectedGender}
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
                        checked={selectedGender === "Other"}
                        onChange={handleSelectedGender}
                        value="Other"
                        name="radio-buttons"
                        inputProps={{"aria-label": "Other"}}
                        icon={<RadioButtonUnchecked color={"primary"}/>}
                        checkedIcon={<CheckCircle color={"primary"}/>}
                        size="small"
                    />
                </div>
                {(selectedGender === "Other") && (
                    <div className={classes.textFieldWrapper}>
                        <ChangeInfoTextField
                            onChange={handleChangeGender}
                            label="Gender"
                            type="text"
                            variant="filled"
                            value={otherGender}
                            fullWidth
                        />
                    </div>
                )}
            </div>
            <Divider/>
            <div className={classes.buttonWrapper}>
                <Button
                    onClick={onSubmit}
                    disabled={isLoading}
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
