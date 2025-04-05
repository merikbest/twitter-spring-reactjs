import React, { FC, ReactElement, useState } from "react";
import { Divider, Radio, Switch, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import { usePhotoTaggingStyles } from "./PhotoTaggingStyles";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";

const PhotoTagging: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = usePhotoTaggingStyles();
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState<string>("Anyone");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h6" component="div" className={classes.title}>
                    {t("PHOTO_TAGGING", { defaultValue: "Photo tagging" })}
                    <span className={classes.switch}>
                        <Switch defaultChecked />
                    </span>
                </Typography>
                <Typography variant="subtitle2" component="div">
                    {t("PHOTO_TAGGING_DESCRIPTION", {
                        defaultValue: "Allow people to tag you in their photos and receive notifications when they do so."
                    })}
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("ANYONE_CAN_TAG_YOU", { defaultValue: "Anyone can tag you" })}
                    </Typography>
                    <Radio
                        checked={selectedValue === "Anyone"}
                        onChange={handleChange}
                        value="Anyone"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Anyone" }}
                        icon={<RadioButtonUnchecked color="primary" />}
                        checkedIcon={<CheckCircle color="primary" />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("ONLY_PEOPLE_YOU_FOLLOW_CAN_TAG_YOU", {
                            defaultValue: "Only people you follow can tag you"
                        })}
                    </Typography>
                    <Radio
                        checked={selectedValue === "Others"}
                        onChange={handleChange}
                        value="Others"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Others" }}
                        icon={<RadioButtonUnchecked color="primary" />}
                        checkedIcon={<CheckCircle color="primary" />}
                        size="small"
                    />
                </div>
            </div>
        </>
    );
};

export default withDocumentTitle(PhotoTagging)("Photo tagging");
