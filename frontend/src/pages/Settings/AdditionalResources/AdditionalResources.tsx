import React, { FC, ReactElement } from "react";
import { Divider, List, ListItem, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useAdditionalResourcesStyles } from "./AdditionalResourcesStyles";
import { ArrowTopIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { withDocumentTitle } from "../../../hoc/withDocumentTitle";
import {
    ABOUT_TWITTER,
    ADS_TWITTER,
    BLOG_TWITTER,
    BRAND_TOOLKIT,
    BUSINESS_TWITTER,
    CAREERS_TWITTER,
    DEVELOPER_TWITTER,
    HELP_TWITTER,
    HOW_TWITTER_ADS_WORK,
    MARKETING_TWITTER,
    STATUS_TWITTER,
    TWITTER_COOKIES,
    TWITTER_DIRECTORY_PROFILES,
    TWITTER_PRIVACY,
    TWITTER_RELEASE_NOTES,
    TWITTER_TOS
} from "../../../constants/url-constants";

const AdditionalResources: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useAdditionalResourcesStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("ADDITIONAL_RESOURCES_DESCRIPTION", {
                        defaultValue: `Check out other places for helpful information to learn more about Twitter 
                        products and services.`
                    })}
                </Typography>
            </div>
            <div className={classnames(classes.listWrapper, globalClasses.listItemWrapper)}>
                <List component="nav" aria-label="main mailbox folders">
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant="h5" component="div">
                            {t("RELEASE_NOTES", { defaultValue: "Release notes" })}
                        </Typography>
                    </div>
                    <a href={TWITTER_RELEASE_NOTES} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("PRIVACY_POLICY", { defaultValue: "Privacy policy" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <Divider />
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant="h5" component="div">
                            {t("LEGAL", { defaultValue: "Legal" })}
                        </Typography>
                    </div>
                    <a href={HOW_TWITTER_ADS_WORK} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("ADS_INFO", { defaultValue: "Ads info" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={TWITTER_COOKIES} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("COOKIE_POLICY", { defaultValue: "Cookie Policy" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={TWITTER_PRIVACY} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("PRIVACY_POLICY", { defaultValue: "Privacy Policy" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={TWITTER_TOS} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("TERMS_OF_SERVICE", { defaultValue: "Terms of Service" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <Divider />
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant="h5" component="div">
                            {t("MISCELLANEOUS", { defaultValue: "Miscellaneous" })}
                        </Typography>
                    </div>
                    <a href={ABOUT_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("ABOUT", { defaultValue: "About" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={ADS_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("ADVERTISING", { defaultValue: "Advertising" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={BLOG_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("BLOG", { defaultValue: "Blog" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={BRAND_TOOLKIT} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("BRAND_RESOURCES", { defaultValue: "Brand Resources" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={CAREERS_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("CAREERS", { defaultValue: "Careers" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={DEVELOPER_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("DEVELOPERS", { defaultValue: "Developers" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={TWITTER_DIRECTORY_PROFILES} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("DIRECTORY", { defaultValue: "Directory" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={HELP_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("HELP_CENTER", { defaultValue: "Help Center" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={MARKETING_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("MARKETING", { defaultValue: "Marketing" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={STATUS_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("STATUS", { defaultValue: "Status" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowTopIcon}
                            </div>
                        </ListItem>
                    </a>
                    <a href={BUSINESS_TWITTER} target="_blank">
                        <ListItem>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("TWITTER_FOR_BUSINESS", { defaultValue: "Twitter for Business" })}
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

export default withDocumentTitle(AdditionalResources)("Additional resources");
