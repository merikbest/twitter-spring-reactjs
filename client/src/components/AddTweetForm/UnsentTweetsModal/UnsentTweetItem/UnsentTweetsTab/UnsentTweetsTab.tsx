import React, {ChangeEvent, FC, memo, ReactElement} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

interface UnsentTweetsTabProps {
    classes: ClassNameMap<string>
    activeTab: number;
    handleChangeTab: (event: ChangeEvent<{}>, newValue: number) => void;
}

const UnsentTweetsTab: FC<UnsentTweetsTabProps> = memo(({classes, activeTab, handleChangeTab}): ReactElement => {
    return (
        <div className={classes.tabs}>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                <Tab className={classes.tab} label="Scheduled"/>
                <Tab className={classes.tab} label="Drafts"/>
            </Tabs>
        </div>
    );
});

export default UnsentTweetsTab;
