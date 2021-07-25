import React, {FC, ReactElement, ReactNode} from 'react';
import {Container, Grid} from '@material-ui/core';
import {useLocation} from "react-router-dom";

import SideMenu from "../components/SideMenu/SideMenu";
import Tags from "../components/Tags/Tags";
import Users from '../components/Users/Users';
import {useLayoutStyles} from "./LayoutStyles";
import SideSearch from "../components/SideSearch/SideSearch";

interface Layout {
    children: ReactNode;
}

export const Layout: FC<Layout> = ({children}): ReactElement => {
    const classes = useLayoutStyles();
    const location = useLocation();

    if (location.pathname.includes("/signin") || location.pathname.includes("/login")) {
        return <div>{children}</div>;
    }

    return (
        <Container className={classes.wrapper} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid sm={1} md={2} item style={{minWidth: "256px"}}>
                    <SideMenu/>
                </Grid>
                <Grid sm={8} md={6} item>
                    {children}
                </Grid>
                <Grid sm={3} md={3} item style={{minWidth: "350px"}}>
                    <div className={classes.rightSide}>
                        <SideSearch/>
                        <Tags/>
                        <Users/>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};
