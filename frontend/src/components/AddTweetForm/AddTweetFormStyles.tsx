import { makeStyles, Theme } from "@material-ui/core";
import { QuoteTweetResponse } from "../../types/tweet";
import { BACKGROUND } from "../../constants/common-constants";

interface AddTweetFormStyles {
    quoteTweet?: QuoteTweetResponse;
    isScheduled?: boolean;
}

export const useAddTweetFormStyles = makeStyles<Theme, AddTweetFormStyles>((theme) => ({
    content: {
        display: "flex",
        width: "100%"
    },
    textareaWrapper: {
        marginLeft: 15,
        width: "100%"
    },
    contentTextarea: {
        width: "100%",
        border: 0,
        fontSize: 20,
        outline: "none",
        fontFamily: "inherit",
        resize: "none",
        backgroundColor: "transparent",
        caretColor: localStorage.getItem(BACKGROUND) === "DEFAULT" ? "#000" : "#fff",
        color: localStorage.getItem(BACKGROUND) === "DEFAULT" ? "#000" : "#fff"
    },
    formItems: {
        marginLeft: 58
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    footerWrapper: {
        display: "flex",
        position: "relative",
        paddingTop: 5,
        paddingBottom: 5,
        left: -13,
        justifyContent: "space-between",
        maxWidth: 450,
        marginTop: 10,
        paddingLeft: 70
    },
    quoteImage: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.quoteTweet || props.isScheduled ? theme.palette.primary.light : theme.palette.primary.main
            }
        }
    },
    footerAddForm: {
        display: "flex",
        alignItems: "center"
    },
    footerAddFormCircleProgress: {
        position: "relative",
        width: 20,
        height: 20,
        margin: "0 10px",
        "& .MuiCircularProgress-root": {
            position: "absolute"
        }
    }
}));
