import React, { FC, ReactElement, ReactNode } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { getYear } from "date-fns";
import { useSelector } from "react-redux";

import SideMenu from "../components/SideMenu/SideMenu";
import Tags from "../components/Tags/Tags";
import Users from "../components/Users/Users";
import { useLayoutStyles } from "./LayoutStyles";
import SideSearch from "../components/SideSearch/SideSearch";
import { EditIcon } from "../icons";
import { DisplayProps } from "./Settings/AccessibilityDisplayLanguages/Display/Display";
import ProfileImages from "../components/ProfileImages/ProfileImages";
import { selectImages } from "../store/ducks/userProfile/selectors";
import { ACCOUNT, SETTINGS } from "../constants/path-constants";
import { TWITTER_ADS_WORK, TWITTER_COOKIES, TWITTER_PRIVACY, TWITTER_TOS } from "../constants/url-constants";

interface Layout {
    children: ReactNode;
}

export const Layout: FC<Layout & DisplayProps> = (
    {
        children,
        changeBackgroundColor,
        changeColorScheme
    }
): ReactElement => {
    const classes = useLayoutStyles();
    const location = useLocation();
    const tweetImages = useSelector(selectImages);

    if (location.pathname.includes(ACCOUNT)) {
        return <div>{children}</div>;
    }

    return (
        <Container className={classes.wrapper} maxWidth="lg">
            <Grid container spacing={3}>
                <div className={classes.leftSideGrid}>
                    <Grid sm={1} md={2} item>
                        <SideMenu changeBackgroundColor={changeBackgroundColor} changeColorScheme={changeColorScheme} />
                    </Grid>
                </div>
                {(location.pathname.includes("/message") || location.pathname.includes(SETTINGS)) ? (
                    <>
                        {children}
                    </>
                ) : (
                    <>
                        <Grid sm={8} md={6} item>
                            {children}
                        </Grid>
                        <div>
                            <SideSearch />
                            {tweetImages.length !== 0 && <ProfileImages />}
                            <div className={classes.rightSide}>
                                <Tags />
                                <Users />
                                <div className={classes.footer}>
                                    <div>
                                        <a href={TWITTER_TOS} target={"_blank"}>
                                            <Typography component={"span"}>
                                                Terms of Service
                                            </Typography>
                                        </a>
                                        <a href={TWITTER_PRIVACY} target={"_blank"}>
                                            <Typography component={"span"}>
                                                Privacy Policy
                                            </Typography>
                                        </a>
                                        <a href={TWITTER_COOKIES} target={"_blank"}>
                                            <Typography component={"span"}>
                                                Cookie Policy
                                            </Typography>
                                        </a>
                                    </div>
                                    <div>
                                        <a href={TWITTER_ADS_WORK} target={"_blank"}>
                                            <Typography component={"span"}>
                                                Ads info
                                            </Typography>
                                        </a>
                                        <Typography component={"span"}>
                                            More {EditIcon}
                                        </Typography>
                                        <Typography component={"span"}>
                                            {`© ${getYear(Date.now())} Twitter, Inc.`}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Grid>
        </Container>
    );
};
