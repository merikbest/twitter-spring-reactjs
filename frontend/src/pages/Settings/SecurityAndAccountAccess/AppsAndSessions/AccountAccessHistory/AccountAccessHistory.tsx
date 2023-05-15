import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { SETTINGS_SECURITY_CONNECTED_APPS } from "../../../../../constants/path-constants";
import { ACCESSING_YOUR_TWITTER_DATA } from "../../../../../constants/url-constants";

const AccountAccessHistory: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {"If you see any suspicious activity from an app, go to "}
                    <MuiLink variant="subtitle2" to={SETTINGS_SECURITY_CONNECTED_APPS} component={Link}>
                        Connected apps
                    </MuiLink>
                    {" to revoke its access. In some cases the IP location may differ from your physical location. "}
                    <MuiLink href={ACCESSING_YOUR_TWITTER_DATA} variant="subtitle2" target="_blank" rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(AccountAccessHistory)("Account access history");
