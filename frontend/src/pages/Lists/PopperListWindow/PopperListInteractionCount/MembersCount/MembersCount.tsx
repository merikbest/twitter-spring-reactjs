import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { selectListDetailItemMembersSize } from "../../../../../store/ducks/listDetail/selectors";

const MembersCount = memo((): ReactElement => {
    const membersSize = useSelector(selectListDetailItemMembersSize);

    return (
        <>
            <Typography variant={"h6"} component={"span"}>
                {membersSize}
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {" Members"}
            </Typography>
        </>
    );
});

export default MembersCount;
