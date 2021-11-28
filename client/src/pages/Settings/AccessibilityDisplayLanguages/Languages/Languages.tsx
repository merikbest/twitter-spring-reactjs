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
                <Typography component={"div"} className={classes.text}>
                    Manage which languages are used to personalize your Twitter experience.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Display language
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Select your preferred language for headlines, buttons, and other text from Twitter.
                </Typography>
            </div>
            <Link to={"/settings/info/languages"} className={classes.accessibilityWrapper}>
                <div className={classes.accessibilityLink}>
                    <div className={classes.accessibilityInfo}>
                        <div>Display language</div>
                        <Typography component={"div"} className={classes.text}>
                            {myProfile?.language}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Select additional languages
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Select additional languages for the content you want to see on Twitter.
                </Typography>
            </div>
            <div className={classes.accessibilityLink}>
                <div className={classes.accessibilityInfo}>
                    <div>Additional languages you speak</div>
                </div>
                {ArrowRightIcon}
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Languages you may know
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage the languages Twitter inferred based on your activity, such as the accounts you follow and
                    the Tweets you engage with.
                </Typography>
            </div>
            <div className={classes.accessibilityLink}>
                <div className={classes.accessibilityInfo}>
                    <div>Languages you may know</div>
                </div>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default Languages;
