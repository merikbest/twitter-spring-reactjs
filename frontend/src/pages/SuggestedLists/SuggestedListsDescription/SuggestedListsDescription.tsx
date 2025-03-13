import React, { memo, ReactElement } from "react";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useSuggestedListsStyles } from "../SuggestedListsStyles";

const SuggestedListsDescription = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useSuggestedListsStyles();
    const { t } = useTranslation();

    return (
        <>
            <PageHeaderWrapper backButton>
                <Typography variant="h5" component="div">
                    {t("SUGGESTED_LISTS", { defaultValue: "Suggested Lists" })}
                </Typography>
            </PageHeaderWrapper>
            <Paper className={classes.content} variant="outlined">
                <img
                    className={classes.contentImage}
                    src="https://ton.twimg.com/onboarding/channels/discovery-v2.png"
                    alt="contentImage"
                />
                <div className={classes.infoWrapper}>
                    <Typography variant="h3" component="div" className={classes.infoTitle}>
                        {t("CHOOSE_YOUR_LISTS_TITLE", { defaultValue: "Choose your Lists" })}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        {t("CHOOSE_YOUR_LISTS_DESCRIPTION", {
                            defaultValue: "When you follow a List, you'll be able to quickly keep up with the experts on what you care about most." })}
                    </Typography>
                </div>
            </Paper>
            <Typography variant="h5" component="div" className={globalClasses.itemInfoWrapper}>
                {t("DISCOVER_NEW_LISTS", { defaultValue: "Discover new Lists" })}
            </Typography>
        </>
    );
});

export default SuggestedListsDescription;
