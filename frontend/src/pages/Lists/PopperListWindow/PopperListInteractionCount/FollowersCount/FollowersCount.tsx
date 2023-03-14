import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { selectListDetailItemFollowersSize } from "../../../../../store/ducks/listDetail/selectors";

const FollowersCount = memo((): ReactElement => {
    const followersSize = useSelector(selectListDetailItemFollowersSize);

    return (
        <>
            <Typography variant={"h6"} component={"span"}>
                {followersSize}
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {" Followers"}
            </Typography>
        </>
    );
});

export default FollowersCount;
