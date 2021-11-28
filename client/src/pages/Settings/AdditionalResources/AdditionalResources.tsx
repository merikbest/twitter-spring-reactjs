import React, {FC, ReactElement} from 'react';
import {Divider, List, ListItem, Typography} from "@material-ui/core";

import {useAdditionalResourcesStyles} from "./AdditionalResourcesStyles";
import {ArrowTopIcon} from "../../../icons";

const AdditionalResources: FC = (): ReactElement => {
    const classes = useAdditionalResourcesStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Check out other places for helpful information to learn more about Twitter products and
                    services.
                </Typography>
            </div>
            <div className={classes.listWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.title}>
                            Release notes
                        </Typography>
                    </div>
                    <a href="https://twitter.com/i/release_notes" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Privacy policy
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <Divider/>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.title}>
                            Legal
                        </Typography>
                    </div>
                    <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo"
                       target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Ads info
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://help.twitter.com/rules-and-policies/twitter-cookies" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Cookie Policy
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/privacy" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Privacy Policy
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/tos" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Terms of Service
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <Divider/>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.title}>
                            Miscellaneous
                        </Typography>
                    </div>
                    <a href="https://about.twitter.com/en" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    About
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://ads.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Advertising
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://blog.twitter.com/" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Blog
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://about.twitter.com/who-we-are/brand-toolkit" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Brand Resources
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://careers.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Careers
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://developer.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Developers
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/i/directory/profiles" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Directory
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://help.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Help Center
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://marketing.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Marketing
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://status.twitterstat.us" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Status
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://business.twitter.com/" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography component={"div"} className={classes.subtitle}>
                                    Twitter for Business
                                </Typography>
                            </div>
                            <div className={classes.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                </List>
            </div>
        </>
    );
};

export default AdditionalResources;
