import React, {FC, ReactElement} from 'react';
import {Divider, List, ListItem, Typography} from "@material-ui/core";

import {useAdditionalResourcesStyles} from "./AdditionalResourcesStyles";
import {ArrowTopIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import classnames from "classnames";
import {withDocumentTitle} from "../../../hoc/withDocumentTitle";

const AdditionalResources: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useAdditionalResourcesStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Check out other places for helpful information to learn more about Twitter products and services.
                </Typography>
            </div>
            <div className={classnames(classes.listWrapper, globalClasses.listItemWrapper)}>
                <List component="nav" aria-label="main mailbox folders">
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Release notes
                        </Typography>
                    </div>
                    <a href="https://twitter.com/i/release_notes" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Privacy policy
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <Divider/>
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Legal
                        </Typography>
                    </div>
                    <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo"
                       target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Ads info
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://help.twitter.com/rules-and-policies/twitter-cookies" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Cookie Policy
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/privacy" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Privacy Policy
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/tos" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Terms of Service
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <Divider/>
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Miscellaneous
                        </Typography>
                    </div>
                    <a href="https://about.twitter.com/en" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    About
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://ads.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Advertising
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://blog.twitter.com/" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Blog
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://about.twitter.com/who-we-are/brand-toolkit" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Brand Resources
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://careers.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Careers
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://developer.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Developers
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://twitter.com/i/directory/profiles" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Directory
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://help.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Help Center
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://marketing.twitter.com" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Marketing
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://status.twitterstat.us" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Status
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href="https://business.twitter.com/" target={"_blank"}>
                        <ListItem>
                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    Twitter for Business
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(AdditionalResources);
