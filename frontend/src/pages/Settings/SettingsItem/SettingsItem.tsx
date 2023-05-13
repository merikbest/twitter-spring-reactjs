import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import { ArrowRightIcon } from "../../../icons";

interface SettingsItemProps {
    index: number;
    linkTo: string;
    selectedIndex: number;
    handleListItemClick: (index: number) => void;
    title: string;
}

const SettingsItem: FC<SettingsItemProps> = (
    {
        index,
        linkTo,
        selectedIndex,
        handleListItemClick,
        title
    }
): ReactElement => {
    return (
        <NavLink to={linkTo}>
            <ListItem selected={selectedIndex === index} onClick={() => handleListItemClick(index)}>
                <Typography variant={"body1"} component={"span"}>
                    {title}
                </Typography>
                {ArrowRightIcon}
            </ListItem>
        </NavLink>
    );
};

export default SettingsItem;
