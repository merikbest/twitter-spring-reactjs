import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, InputAdornment } from "@material-ui/core";

import { useGlobalStyles } from "../../../../util/globalClasses";
import { SearchIcon } from "../../../../icons";
import { MainSearchTextField } from "../../../SearchTextField/MainSearchTextField";
import CloseButton from "../../../CloseButton/CloseButton";
import { useInputText } from "../../../../hook/useInputText";
import { useDebounce } from "../../../../hook/useDebounce";
import GifTopics from "./GifTopics/GifTopics";
import GifList from "./GifList/GifList";
import Spinner from "../../../Spinner/Spinner";
import { GiphyDataProps } from "../../../../types/tweet";
import {
    fetchGifs,
    resetGifs,
    setGif,
    setGifs,
    setLoadingGifsState
} from "../../../../store/ducks/addTweetForm/actionCreators";
import { selectIsGifsLoaded, selectIsGifsLoading } from "../../../../store/ducks/addTweetForm/selector";
import { LoadingStatus } from "../../../../types/common";

interface GifModalWindowProps {
    visible: boolean;
    onClose: () => void;
}

const GifModalWindow: FC<GifModalWindowProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const isGifsLoading = useSelector(selectIsGifsLoading);
    const isGifsLoaded = useSelector(selectIsGifsLoaded);
    const { text, setText, handleChangeText } = useInputText();
    const textToSearch = useDebounce(text, 300);

    useEffect(() => {
        if (textToSearch) {
            dispatch(fetchGifs(text));
        }
    }, [textToSearch]);

    const onClickGifTopic = (topic: string): void => {
        setText(topic);
        dispatch(setGifs([]));
        dispatch(setLoadingGifsState(LoadingStatus.LOADING));
    };

    const onCloseModalWindow = (): void => {
        setText("");
        dispatch(resetGifs());
        onClose();
    };

    const onClickGif = (gif: GiphyDataProps): void => {
        dispatch(setGif(gif));
        onCloseModalWindow();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onCloseModalWindow}>
            <DialogTitle>
                <CloseButton onClose={onCloseModalWindow} />
                <MainSearchTextField
                    variant="outlined"
                    placeholder="Search for GIFs"
                    onChange={handleChangeText}
                    value={text}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {SearchIcon}
                            </InputAdornment>
                        )
                    }}
                    marginTop={0}
                    width={520}
                />
            </DialogTitle>
            <DialogContent className={globalClasses.dialogContent}>
                {(isGifsLoading && text !== "") ? (
                    <Spinner />
                ) : (
                    (isGifsLoaded && text === "") ? (
                        <GifTopics onClickGifTopic={onClickGifTopic} />
                    ) : (
                        <GifList onClickGif={onClickGif} />
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default GifModalWindow;
