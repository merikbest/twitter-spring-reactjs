import React, { ReactElement } from "react";
import { Paper } from "@material-ui/core";

import { useGlobalStyles } from "../../util/globalClasses";
import ListsHeader from "./ListsHeader";
import PinnedLists from "./PinnedLists";
import DiscoverLists from "./DiscoverLists";
import UserLists from "./UserLists/UserLists";
import { useLists } from "./useLists";

const Lists = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    useLists();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <ListsHeader />
            <PinnedLists />
            <DiscoverLists />
            <UserLists />
        </Paper>
    );
};

export default Lists;
