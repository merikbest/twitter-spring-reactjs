import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Link as MuiLink, Typography} from "@material-ui/core";

import {useGlobalStyles} from "../../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";

const AccountAccessHistory: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {"If you see any suspicious activity from an app, go to "}
                    <MuiLink variant="subtitle2" to={"/settings/security/connected_apps"} component={Link}>
                        Connected apps
                    </MuiLink>
                    {" to revoke its access. In some cases the IP location may differ from your physical location. "}
                    <MuiLink
                        href="https://help.twitter.com/managing-your-account/accessing-your-twitter-data"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(AccountAccessHistory);
