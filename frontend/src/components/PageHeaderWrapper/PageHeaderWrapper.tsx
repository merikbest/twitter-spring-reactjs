import React, { FC, ReactElement, ReactNode } from "react";
import { Paper } from "@material-ui/core";

import { useGlobalStyles } from "../../util/globalClasses";
import BackButton from "../BackButton/BackButton";

interface PageHeaderWrapperProps {
    children: ReactNode;
    backButton?: boolean;
}

const PageHeaderWrapper: FC<PageHeaderWrapperProps> = ({ children, backButton }): ReactElement => {
    const globalClasses = useGlobalStyles({});

    return (
        <Paper className={globalClasses.pageHeader} variant="outlined">
            {backButton && <BackButton />}
            {children}
        </Paper>
    );
};

export default PageHeaderWrapper;
