import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Checkbox, Typography} from "@material-ui/core";

import {useFiltersStyles} from "./FiltersStyles";
import {ArrowRightIcon} from "../../../../icons";

const Filters: FC = (): ReactElement => {
    const classes = useFiltersStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Choose the notifications you’d like to see — and those you don’t.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Quality filter</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Choose to filter out content such as duplicate or automated Tweets. This doesn’t apply to
                    notifications from accounts you follow or have interacted with recently.
                    <a
                        href={"https://help.twitter.com/managing-your-account/understanding-the-notifications-timeline"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/advanced_filters"} className={classes.filtersWrapper}>
                <div className={classes.filtersLink}>
                    <Typography component={"span"}>
                        Muted notifications
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default Filters;
