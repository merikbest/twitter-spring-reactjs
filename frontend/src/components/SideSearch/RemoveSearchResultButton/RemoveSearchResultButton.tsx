import React, { FC, MouseEvent, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";

import { useRemoveSearchResultButtonStyles } from "./RemoveSearchResultButtonStyles";
import { CloseIcon } from "../../../icons";
import { deleteRecentSearchResult } from "../../../store/ducks/search/actionCreators";
import { SearchTermsRequest } from "../../../store/ducks/search/contracts/state";
import { SEARCH_TERMS } from "../../../constants/common-constants";

interface RemoveSearchResultButtonProps {
    stateItem: "text" | "tags" | "users",
    item: string | number
}

const RemoveSearchResultButton: FC<RemoveSearchResultButtonProps> = ({ stateItem, item }): ReactElement => {
    const classes = useRemoveSearchResultButtonStyles();
    const dispatch = useDispatch();

    const onClickRemoveSearchResult = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        dispatch(deleteRecentSearchResult({ stateItem, item }));
        const searchTerms: SearchTermsRequest = JSON.parse(localStorage.getItem(SEARCH_TERMS)!);
        const newArray = [...searchTerms[stateItem]].filter((storageItem: string | number) => storageItem !== item);
        localStorage.setItem(SEARCH_TERMS, JSON.stringify({ ...searchTerms, [stateItem]: newArray }));
    };

    return (
        <IconButton className={classes.closeIconButton} onClick={onClickRemoveSearchResult} color="primary">
            {CloseIcon}
        </IconButton>
    );
};

export default RemoveSearchResultButton;
