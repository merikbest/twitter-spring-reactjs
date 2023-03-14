import React, { ChangeEvent, FC, memo, ReactElement } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useUnsentTweetsTabStyles } from "./UnsentTweetsTabStyles";

interface UnsentTweetsTabProps {
    activeTab: number;
    handleChangeTab: (event: ChangeEvent<{}>, newValue: number) => void;
}

const UnsentTweetsTab: FC<UnsentTweetsTabProps> = memo(({ activeTab, handleChangeTab }): ReactElement => {
    const classes = useUnsentTweetsTabStyles();
    return (
        <div className={classes.tabs}>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                <Tab className={classes.tab} label="Scheduled" />
                <Tab className={classes.tab} label="Drafts" />
            </Tabs>
        </div>
    );
});

export default UnsentTweetsTab;
