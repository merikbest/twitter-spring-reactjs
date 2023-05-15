import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider, Typography } from "@material-ui/core";

import { useLanguagesStyles } from "./LanguagesStyles";
import { ArrowRightIcon } from "../../../../icons";
import { selectUserProfileLanguage } from "../../../../store/ducks/user/selectors";
import { useGlobalStyles } from "../../../../util/globalClasses";
import classnames from "classnames";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_INFO_LANGUAGES } from "../../../../constants/path-constants";

const Languages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useLanguagesStyles();
    const myProfileLanguage = useSelector(selectUserProfileLanguage);

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage which languages are used to personalize your Twitter experience.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Display language
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Select your preferred language for headlines, buttons, and other text from Twitter.
                </Typography>
            </div>
            <Link to={SETTINGS_INFO_LANGUAGES} className={globalClasses.linkWrapper}>
                <div className={classnames(globalClasses.contentLink, classes.accessibilityWrapper)}>
                    <div className={classes.accessibilityInfo}>
                        <Typography variant={"body1"} component={"div"}>
                            Display language
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            {myProfileLanguage}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Select additional languages
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Select additional languages for the content you want to see on Twitter.
                </Typography>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Additional languages you speak
                </Typography>
                {ArrowRightIcon}
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Languages you may know
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage the languages Twitter inferred based on your activity, such as the accounts you follow and
                    the Tweets you engage with.
                </Typography>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Languages you may know
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default withDocumentTitle(Languages)("Languages");
