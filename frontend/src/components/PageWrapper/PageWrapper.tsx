import React, { FC, ReactElement, ReactNode } from "react";
import { Paper, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../util/globalClasses";
import { usePageWrapperStyles } from "./PageWrapperStyles";
import BackButton from "../BackButton/BackButton";

interface PageWrapperProps {
    translationKey: string;
    defaultValue: string;
    children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ translationKey, defaultValue, children }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = usePageWrapperStyles();
    const { t } = useTranslation();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                <div>
                    <BackButton />
                    <Typography variant="h5">
                        {t(translationKey, { defaultValue })}
                    </Typography>
                </div>
            </Paper>
            {children}
        </Paper>
    );
};

export default PageWrapper;
