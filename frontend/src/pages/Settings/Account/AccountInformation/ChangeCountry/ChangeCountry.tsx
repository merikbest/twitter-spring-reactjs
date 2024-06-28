import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useChangeCountryStyles } from "./ChangeCountryStyles";
import { FilledSelect } from "../../../../../components/FilledSelect/FilledSelect";
import { selectUserDataId, selectUserProfileCountry } from "../../../../../store/ducks/user/selectors";
import { setUserLoadingStatus, updateCountry } from "../../../../../store/ducks/user/actionCreators";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { HOW_TO_CHANGE_COUNTRY_SETTINGS } from "../../../../../constants/url-constants";
import { LoadingStatus } from "../../../../../types/common";
import { fetchCountryCodes } from "../../../../../store/ducks/countryCode/actionCreators";
import { selectCountryCodeItems, selectIsCountryCodesLoading } from "../../../../../store/ducks/countryCode/selectors";

const ChangeCountry: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useChangeCountryStyles();
    const dispatch = useDispatch();
    const countryCodes = useSelector(selectCountryCodeItems);
    const isCountryCodesLoading = useSelector(selectIsCountryCodesLoading);
    const myProfileId = useSelector(selectUserDataId);
    const myProfileCountry = useSelector(selectUserProfileCountry);
    const [country, setCountry] = useState<string>("");

    useEffect(() => {
        dispatch(fetchCountryCodes());

        if (myProfileId) {
            setCountry(myProfileCountry!);
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const onChangeCountry = (event: ChangeEvent<{ value: unknown }>): void => {
        setCountry(event.target.value as string);
        dispatch(updateCountry({ country: event.target.value as string }));
    };

    return (
        <div className={classnames(classes.selectWrapper, globalClasses.itemInfoWrapper)}>
            <FormControl variant="filled">
                <InputLabel htmlFor="select-country">
                    Country
                </InputLabel>
                <FilledSelect
                    variant="filled"
                    labelId="select-country"
                    id="select-country"
                    native
                    value={country}
                    onChange={onChangeCountry}
                    disabled={isCountryCodesLoading}
                    label="Country"
                    fullWidth
                >
                    <option aria-label="None" />
                    {countryCodes.map(countryCode => (
                            <option key={countryCode.id} value={countryCode.countryCode}>
                                {countryCode.country}
                            </option>
                        )
                    )}
                </FilledSelect>
            </FormControl>
            <Typography variant={"subtitle2"} component={"div"}>
                {"This is the primary country associated with your account. Your country helps us to customize " +
                    "your Twitter experience. "}
                <MuiLink href={HOW_TO_CHANGE_COUNTRY_SETTINGS} variant="subtitle2" target="_blank" rel="noopener">
                    Learn more
                </MuiLink>
            </Typography>
        </div>
    );
};

export default withDocumentTitle(ChangeCountry)("Change country");
