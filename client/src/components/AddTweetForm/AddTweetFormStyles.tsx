import {makeStyles, Theme} from "@material-ui/core";
import {Tweet} from "../../store/ducks/tweets/contracts/state";

interface AddTweetFormStyles {
    quoteTweet?: Tweet;
    isScheduled?: boolean;
}

export const useAddTweetFormStyles = makeStyles<Theme, AddTweetFormStyles>((theme) => ({
    content: {
        display: 'flex',
        width: '100%',
    },
    infoWrapper: {
        marginBottom: 10,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 12,
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
    textareaWrapper: {
        marginLeft: 15,
        width: "100%",
    },
    contentTextarea: {
        width: '100%',
        border: 0,
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
        backgroundColor: "transparent",
        caretColor: localStorage.getItem("background") === "DEFAULT" ? "#000" : "#fff",
        color: localStorage.getItem("background") === "DEFAULT" ? "#000" : "#fff",
    },
    image: {
        position: 'relative',
        '& img': {
            marginLeft: "58px",
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 280,
            borderRadius: 20,
            borderColor: theme.palette.info.light,
        },
    },
    imageSmall: {
        position: 'relative',
        '& img': {
            marginLeft: 58,
            objectFit: "cover",
            marginTop: 10,
            width: 260,
            height: 152,
            borderRadius: 20,
            borderColor: theme.palette.info.light,
        },
    },
    imageRemove: {
        padding: 6,
        top: 15,
        left: 65,
        position: 'absolute',
        backgroundColor: theme.palette.common.black,
        opacity: 0.75,
        "& svg": {
            verticalAlign: "top",
            fill: theme.palette.common.white,
            width: 18,
            height: 18,
        },
        "&.MuiIconButton-root": {
            "&:hover": {
                backgroundColor: "rgba(39, 44, 48, 0.75) !important"
            },
        },
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerWrapper: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        left: -13,
        justifyContent: 'space-between',
        maxWidth: 450,
        marginTop: 10,
        paddingLeft: 70,
    },
    quoteImage: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.quoteTweet || props.isScheduled ? theme.palette.primary.light : theme.palette.primary.main,
            },
        },
    },
    footerAddForm: {
        display: 'flex',
        alignItems: 'center',
    },
    footerAddFormCircleProgress: {
        position: 'relative',
        width: 20,
        height: 20,
        margin: '0 10px',
        '& .MuiCircularProgress-root': {
            position: 'absolute',
        },
    },
}));
