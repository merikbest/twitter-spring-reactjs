import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useManageMembersItemStyles } from "../ManageMembersItemStyles";
import { processUserToListMembers } from "../../../../../../../store/ducks/listMembers/actionCreators";

interface ManageMemberButtonProps {
    userId: number;
    listId: number;
    isMemberInList: boolean;
    isSuggested?: boolean;
}

const ManageMemberButton: FC<ManageMemberButtonProps> = memo((
    {
        userId,
        listId,
        isMemberInList,
        isSuggested
    }
): ReactElement => {
    const dispatch = useDispatch();
    const classes = useManageMembersItemStyles();
    const { t } = useTranslation();

    const onClickAddUserToList = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processUserToListMembers({ userId, listId, isSuggested }));
    };

    return (
        <Button
            className={classes[isMemberInList ? "containedButton" : "outlinedButton"]}
            onClick={onClickAddUserToList}
            variant={isMemberInList ? "contained" : "outlined"}
            color="primary"
            size="small"
        >
            {isMemberInList ? t("REMOVE", { defaultValue: "Remove" }) : t("ADD", { defaultValue: "Add" })}
        </Button>
    );
});

export default ManageMemberButton;
