import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Checkbox, Typography, Link as MuiLink} from "@material-ui/core";

import {useFiltersStyles} from "./FiltersStyles";
import {ArrowRightIcon} from "../../../../icons";

const Filters: FC = (): ReactElement => {
    const classes = useFiltersStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Choose the notifications you’d like to see — and those you don’t.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Quality filter
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {"Choose to filter out content such as duplicate or automated Tweets. This doesn’t apply to " +
                    "notifications from accounts you follow or have interacted with recently. "}
                    <MuiLink
                        href="https://help.twitter.com/managing-your-account/understanding-the-notifications-timeline"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Link to={"/settings/privacy_and_safety/advanced_filters"} className={classes.filtersWrapper}>
                <div className={classes.filtersLink}>
                    <Typography variant={"body1"} component={"span"}>
                        Muted notifications
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default Filters;
