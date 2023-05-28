import React, { FC, ReactElement, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    InputAdornment,
    Typography
} from "@material-ui/core";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useGifModalWindowStyles } from "./GifModalWindowStyles";
import { SearchIcon } from "../../../../icons";
import { MainSearchTextField } from "../../../SearchTextField/MainSearchTextField";
import CloseButton from "../../../CloseButton/CloseButton";
import { useInputText } from "../../../../hook/useInputText";
import { useDebounce } from "../../../../hook/useDebounce";
import { axios } from "../../../../core/axios";

interface GifModalWindowProps {
    visible: boolean;
    onClose: () => void;
}

interface GiphyDataProps {
    id: string;
    title: string;
    images: {
        downsized: { url: string }
        downsized_still: { url: string }
    };
}

const gifsPreview = [
    { id: 1, title: "Cats", imgSrc: "https://media4.giphy.com/media/3o85xoi6nNqJQJ95Qc/giphy_s.gif" },
    { id: 2, title: "Dogs", imgSrc: "https://media2.giphy.com/media/V6vNqIGP1RiMEwmMGV/giphy-downsized_s.gif" },
    { id: 3, title: "Hug", imgSrc: "https://media4.giphy.com/media/EvYHHSntaIl5m/480w_s.jpg" },
    { id: 4, title: "Facepalm", imgSrc: "https://media.tenor.com/images/1b58b8869489f53b36407f357faf0168/raw" },
    { id: 5, title: "OMG", imgSrc: "https://media0.giphy.com/media/tkApIfibjeWt1ufWwj/480w_s.jpg" },
    { id: 6, title: "IDK", imgSrc: "https://media3.giphy.com/media/ma7VlDSlty3EA/480w_s.jpg" },
    { id: 7, title: "Agree", imgSrc: "https://media1.giphy.com/media/WJjLyXCVvro2I/giphy_s.gif" },
    { id: 8, title: "Applause", imgSrc: "https://media.tenor.com/images/5656c0cd4de11821336ab2bb920d383a/raw" },
    { id: 9, title: "Dance", imgSrc: "https://media.tenor.com/images/3b39c942b33fc56ac8c821396393b9ae/raw" },
    { id: 10, title: "Eww", imgSrc: "https://media3.giphy.com/media/10FHR5A4cXqVrO/giphy_s.gif" }
];

const GifModalWindow: FC<GifModalWindowProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useGifModalWindowStyles();
    const { text, setText, handleChangeText } = useInputText();
    const textToSearch = useDebounce(text, 300);
    const GIPHY_API_KEY = "GZtggGLShFAsldhNlgteCQgfD27nRb5A";
    const [gifs, setGifs] = useState<GiphyDataProps[]>([]);

    useEffect(() => {
        if (textToSearch) {
            searchGif(text);
        }
    }, [textToSearch]);

    const searchGif = async (text: string): Promise<void> => {
        setGifs([]);
        await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=20&q=${text}`)
            .then((response) => setGifs(response.data.data))
            .catch((error) => console.log(error));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitle>
                <CloseButton onClose={onClose} />
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
                <ImageList cols={2} rowHeight={150}>
                    {(text === "") ? (
                        gifsPreview.map((gif) => (
                                <ImageListItem key={gif.id} className={classes.imageListItem}>
                                    <img alt="" src={gif.imgSrc} />
                                    <ImageListItemBar
                                        title={<Typography variant={"h5"} component={"div"}>{gif.title}</Typography>}
                                    />
                                </ImageListItem>
                            )
                        )
                    ) : (
                        gifs.map((gif) => (
                                <ImageListItem key={gif.id} className={classes.imageListItem}>
                                    <img src={gif.images.downsized.url} alt={gif.title} />
                                </ImageListItem>
                            )
                        )
                    )}
                </ImageList>
            </DialogContent>
        </Dialog>
    );
};

export default GifModalWindow;
