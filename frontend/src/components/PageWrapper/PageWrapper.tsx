import React, { FC, ReactElement, ReactNode } from "react";
import { Paper, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useGlobalStyles } from "../../util/globalClasses";
import { usePageWrapperStyles } from "./PageWrapperStyles";
import BackButton from "../BackButton/BackButton";

interface PageWrapperProps {
    title: string;
    children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ title, children }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = usePageWrapperStyles();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                <div>
                    <BackButton />
                    <Typography variant="h5">{title}</Typography>
                </div>
            </Paper>
            {children}
        </Paper>
    );
};

export default PageWrapper;
