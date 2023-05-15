import React, { FC, ReactElement } from "react";
import { Checkbox, Divider, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useGlobalStyles } from "../../../../../../util/globalClasses";
import { useRecommendedLanguageStyles } from "./RecommendedLanguageStyles";

interface RecommendedLanguageProps {
    title: string;
}

const RecommendedLanguage: FC<RecommendedLanguageProps> = ({ title }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useRecommendedLanguageStyles();

    return (
        <>
            <div className={classnames(globalClasses.infoItemCheckbox, classes.checkboxWrapper)}>
                <Typography variant={"body1"} component={"span"}>
                    {title}
                </Typography>
                <Checkbox />
            </div>
            <Divider />
        </>
    );
};

export default RecommendedLanguage;
