import React, { FC, ReactElement, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Hidden, Typography } from "@material-ui/core";

import { useSideMenuStyles } from "../SideMenuStyles";

interface SideMenuItemProps {
    title: string;
    path: string;
    icon: JSX.Element;
    filledIcon: JSX.Element;
    children?: ReactNode;
}

const SideMenuItem: FC<SideMenuItemProps> = ({ title, path, icon, filledIcon, children }): ReactElement => {
    const classes = useSideMenuStyles();
    const location = useLocation();

    return (
        <li className={classes.itemWrapper}>
            <NavLink to={path} activeClassName={"selected"}>
                <div>
                    <Hidden smDown>
                        {children}
                        {(location.pathname.includes(path)) ? (
                            <span>{filledIcon}</span>
                        ) : (
                            <span>{icon}</span>
                        )}
                        <Typography variant={"h5"}>
                            {title}
                        </Typography>
                    </Hidden>
                </div>
            </NavLink>
        </li>
    );
};

export default SideMenuItem;
