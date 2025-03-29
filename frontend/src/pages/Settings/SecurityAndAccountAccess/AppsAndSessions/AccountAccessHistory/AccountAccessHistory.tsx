import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink, Typography } from "@material-ui/core";
import { Trans, useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { SETTINGS_SECURITY_CONNECTED_APPS } from "../../../../../constants/path-constants";
import { ACCESSING_YOUR_TWITTER_DATA } from "../../../../../constants/url-constants";

const AccountAccessHistory: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <div className={globalClasses.itemInfoWrapper}>
            <Typography variant="subtitle2" component="div">
                <Trans
                    i18nKey={t("ACCOUNT_ACCESS_HISTORY_DESCRIPTION", {
                        defaultValue: `If you see any suspicious activity from an app, go to Connected apps to revoke 
                        its access. In some cases the IP location may differ from your physical location.`
                    })}
                    components={{
                        settingLink: <MuiLink variant="subtitle2" to={SETTINGS_SECURITY_CONNECTED_APPS} component={Link} />
                    }}
                />
                {" "}
                <MuiLink href={ACCESSING_YOUR_TWITTER_DATA} variant="subtitle2" target="_blank" rel="noopener">
                    {t("LEARN_MORE", { defaultValue: "Learn more" })}
                </MuiLink>
            </Typography>
        </div>
    );
};

export default withDocumentTitle(AccountAccessHistory)("Account access history");
