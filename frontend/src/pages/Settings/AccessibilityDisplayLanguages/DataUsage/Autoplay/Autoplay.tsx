import React, { FC, ReactElement, useState } from "react";
import { Link as MuiLink, Radio, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";

import { useAutoplayStyles } from "./AutoplayStyles";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { PUBLIC_AND_PROTECTED_TWEETS } from "../../../../../constants/url-constants";

const Autoplay: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useAutoplayStyles();
    const [selectedValue, setSelectedValue] = useState<string>("Never");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Autoplay
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    {"Select whether videos and GIFs should play automatically on this device. "}
                    <MuiLink href={PUBLIC_AND_PROTECTED_TWEETS} variant="subtitle2" target="_blank" rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        On cellular or Wi-Fi
                    </Typography>
                    <Radio
                        checked={selectedValue === "Wi-Fi"}
                        onChange={handleChange}
                        value="Wi-Fi"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Wi-Fi" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Never
                    </Typography>
                    <Radio
                        checked={selectedValue === "Never"}
                        onChange={handleChange}
                        value="Never"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Never" }}
                        icon={<RadioButtonUnchecked color={"primary"} />}
                        checkedIcon={<CheckCircle color={"primary"} />}
                        size="small"
                    />
                </div>
            </div>
        </>
    );
};

export default withDocumentTitle(Autoplay)("Autoplay");
