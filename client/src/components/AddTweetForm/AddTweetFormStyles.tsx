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
    contentAvatar: {
        width: "46px !important",
        height: "46px !important",
        marginRight: 15,
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
    text: {
        fontSize: 13,
        fontWeight: 400,
        lineHeight: "16px",
        color: theme.palette.text.secondary,
    },
    textareaWrapper: {
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
        caretColor: localStorage.getItem("background") === "Default" ? "#000" : "#fff",
        color: localStorage.getItem("background") === "Default" ? "#000" : "#fff",
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
        "& svg": {
            verticalAlign: "top",
            fill: theme.palette.common.white,
            height: "0.75em",
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
        "& svg": {
            verticalAlign: "top",
            fill: theme.palette.common.white,
            height: "0.75em",
        },
    },
    imageRemove: {
        padding: 6,
        top: 15,
        left: 65,
        position: 'absolute',
        backgroundColor: '#322C28 !important',
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
    footerImage: {
        "& .MuiIconButton-root": {
            color: theme.palette.primary.main,
            padding: 7,
            "& svg": {
                verticalAlign: "bottom",
                height: "0.9em",
            },
            "&:hover": {
                backgroundColor: theme.palette.secondary.light,
            },
        },
    },
    quoteImage: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: props => props.quoteTweet || props.isScheduled ? theme.palette.primary.light : theme.palette.primary.main,
                verticalAlign: "bottom",
                height: "0.9em",
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
