import React, { ChangeEvent, FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClickAwayListener, InputAdornment, List, Typography } from "@material-ui/core";

import { SideSearchTextField } from "../SearchTextField/SideSearchTextField";
import { SearchIcon } from "../../icons";
import { useSideSearchStyles } from "./SideSearchStyles";
import { useDebounce } from "./useDebounce";
import {
    selectLoadingSearchResult,
    selectSearchedText,
    selectSearchTags,
    selectSearchTweetCount,
    selectSearchUsers
} from "../../store/ducks/search/selectors";
import { fetchSearchByText } from "../../store/ducks/search/actionCreators";
import Spinner from "../Spinner/Spinner";
import UserSearchResult from "./UserSearchResult/UserSearchResult";
import TextSearchResult from "./TextSearchResult/TextSearchResult";

const SideSearch: FC = (): ReactElement => {
    const classes = useSideSearchStyles();
    const dispatch = useDispatch();
    const [openPopup, setOpenPopup] = React.useState<boolean>(false);
    const [text, setText] = React.useState<string>("");
    const textToSearch = useDebounce(text, 300);
    const searchedText = useSelector(selectSearchedText);
    const tweetCount = useSelector(selectSearchTweetCount);
    const tags = useSelector(selectSearchTags);
    const users = useSelector(selectSearchUsers);
    const isLoadingSearchResult = useSelector(selectLoadingSearchResult);

    const handleClickOpenPopup = (): void => {
        setOpenPopup((prev) => !prev);
    };

    const handleClickClosePopup = (): void => {
        setOpenPopup(false);
    };

    useEffect(() => {
        if (textToSearch) {
            dispatch(fetchSearchByText(encodeURIComponent(text)));
        }
    }, [textToSearch]);

    const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);
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
                        )
                    }}
                    fullWidth
                />
                {openPopup && (
                    <div className={classes.dropdown}>
                        {text ? (
                            isLoadingSearchResult ? (
                                <Spinner />
                            ) : (
                                <List>
                                    <TextSearchResult text={searchedText!} />
                                    {tweetCount !== 0 &&
                                        <TextSearchResult text={searchedText!} tweetCount={tweetCount} />}
                                    {tags?.map((tag, index) => <TextSearchResult key={index} text={tag} />)}
                                    {users?.map((user) => <UserSearchResult key={user.id} user={user} />)}
                                </List>
                            )
                        ) : (
                            <Typography className={classes.searchText} variant={"body1"} component={"div"}>
                                Try searching for people, topics, or keywords
                            </Typography>
                        )}
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default SideSearch;
