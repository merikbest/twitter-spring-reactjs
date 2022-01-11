import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Divider, Typography} from "@material-ui/core";

import {useLanguagesStyles} from "./LanguagesStyles";
import {ArrowRightIcon} from "../../../../icons";
import {selectUserData} from "../../../../store/ducks/user/selectors";

const Languages: FC = (): ReactElement => {
    const classes = useLanguagesStyles();
    const myProfile = useSelector(selectUserData);

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage which languages are used to personalize your Twitter experience.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Display language
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Select your preferred language for headlines, buttons, and other text from Twitter.
                </Typography>
            </div>
            <Link to={"/settings/info/languages"} className={classes.accessibilityWrapper}>
                <div className={classes.accessibilityLink}>
                    <div className={classes.accessibilityInfo}>
                        <Typography variant={"body1"} component={"div"}>
                            Display language
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            {myProfile?.language}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Select additional languages
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Select additional languages for the content you want to see on Twitter.
                </Typography>
            </div>
            <div className={classes.accessibilityLink}>
                <div className={classes.accessibilityInfo}>
                    <Typography variant={"body1"} component={"div"}>
                        Additional languages you speak
                    </Typography>
                </div>
                {ArrowRightIcon}
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Languages you may know
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage the languages Twitter inferred based on your activity, such as the accounts you follow and
                    the Tweets you engage with.
                </Typography>
            </div>
            <div className={classes.accessibilityLink}>
                <div className={classes.accessibilityInfo}>
                    <Typography variant={"body1"} component={"div"}>
                        Languages you may know
                    </Typography>
                </div>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default Languages;
