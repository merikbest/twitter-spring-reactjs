import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { Route } from "react-router-dom";

import BackButton from "../../../components/BackButton/BackButton";

interface SettingsHeaderProps {
    path: string;
    title: string;
    excludeBackButton?: boolean;
}

const SettingsHeader: FC<SettingsHeaderProps> = ({ path, title, excludeBackButton }): ReactElement => {
    return (
        <Route exact path={path}>
            {!excludeBackButton && <BackButton/>}
            <Typography variant="h5">
                {title}
            </Typography>
        </Route>
    );
};

export default SettingsHeader;
