import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";

import {useDataSharingStyles} from "./DataSharingStyles";

const DataSharing: FC = (): ReactElement => {
    const classes = useDataSharingStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Allow sharing of additional information with Twitter’s business partners.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Allow additional information sharing with business partners
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    Twitter always shares information with business partners as a way to run and improve its products.
                    When enabled, this allows Twitter to share additional information with those partners to help
                    support running Twitter’s business, including making Twitter’s marketing activities on other sites
                    and apps more relevant for you.
                    <a
                        href={"https://help.twitter.com/safety-and-security/data-through-partnerships"}
                        target="_blank"
                        className={classes.link}> Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default DataSharing;
