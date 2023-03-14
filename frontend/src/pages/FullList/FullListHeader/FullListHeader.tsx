import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { LockIcon } from "../../../icons";
import ShareActionsModal from "../ShareActionsModal/ShareActionsModal";
import TopTweetsActionsModal from "../TopTweetsActionsModal/TopTweetsActionsModal";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import {
    selectIsListLoading,
    selectListItemIsPrivate,
    selectListItemName,
    selectListItemOwnerUsername
} from "../../../store/ducks/list/selectors";
import { useFullListStyles } from "../FullListStyles";

const FullListHeader = memo((): ReactElement => {
    const classes = useFullListStyles();
    const isListLoading = useSelector(selectIsListLoading);
    const listName = useSelector(selectListItemName);
    const listIsPrivate = useSelector(selectListItemIsPrivate);
    const listOwnerUsername = useSelector(selectListItemOwnerUsername);

    return (
        <PageHeaderWrapper backButton>
            {!isListLoading && (
                <div>
                    <div>
                        <Typography variant={"h5"} component={"span"}>
                            {listName}
                        </Typography>
                        {listIsPrivate && <span className={classes.lockIcon}>{LockIcon}</span>}
                    </div>
                    <Typography variant={"subtitle2"} component={"div"}>
                        @{listOwnerUsername}
                    </Typography>
                </div>
            )}
            <div className={classes.iconGroup}>
                <ShareActionsModal />
                <TopTweetsActionsModal />
            </div>
        </PageHeaderWrapper>
    );
});

export default FullListHeader;
