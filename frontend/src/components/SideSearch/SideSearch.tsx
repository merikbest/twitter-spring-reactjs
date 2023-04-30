import React, { FC, MouseEvent, ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ClickAwayListener, IconButton, InputAdornment } from "@material-ui/core";

import { SideSearchTextField } from "../SearchTextField/SideSearchTextField";
import { CloseIcon, SearchIcon } from "../../icons";
import { useSideSearchStyles } from "./SideSearchStyles";
import { useDebounce } from "../../hook/useDebounce";
import { fetchSearchByText, resetSearchResult } from "../../store/ducks/search/actionCreators";
import RecentSearchResults from "./RecentSearchResults/RecentSearchResults";
import SearchResults from "./SearchResults/SearchResults";
import { useClickAway } from "../../hook/useClickAway";
import { useInputText } from "../../hook/useInputText";

const SideSearch: FC = (): ReactElement => {
    const classes = useSideSearchStyles();
    const dispatch = useDispatch();
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { text, setText, handleChangeText } = useInputText();
    const textToSearch = useDebounce(text, 300);

    useEffect(() => {
        if (textToSearch) {
            dispatch(fetchSearchByText(encodeURIComponent(text)));
        }
    }, [textToSearch]);

    const handleClickOpenPopup = (): void => {
        onClickOpen();

        if (textToSearch) {
            dispatch(fetchSearchByText(encodeURIComponent(text)));
        }
    };

    const handleClickClosePopup = (): void => {
        onClickClose();
        dispatch(resetSearchResult());
    };

    const handleClearText = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        dispatch(resetSearchResult());
        setText("");
    };

    return (
        <ClickAwayListener onClickAway={handleClickClosePopup}>
            <div className={classes.content}>
                <SideSearchTextField
                    variant="outlined"
                    placeholder="Search Twitter"
                    onChange={handleChangeText}
                    onClick={handleClickOpenPopup}
                    value={text}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {SearchIcon}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            text && (
                                <InputAdornment position="end">
                                    <IconButton id={"clearText"} color="primary" onClick={handleClearText}>
                                        {CloseIcon}
                                    </IconButton>
                                </InputAdornment>
                            )
                        )
                    }}
                    fullWidth
                />
                {open && (
                    <div className={classes.dropdown}>
                        {text ? (
                            <SearchResults />
                        ) : (
                            <RecentSearchResults />
                        )}
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default SideSearch;
