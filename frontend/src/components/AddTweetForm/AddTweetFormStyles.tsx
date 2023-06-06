import { makeStyles } from "@material-ui/core";
import { BACKGROUND } from "../../constants/common-constants";
import { BackgroundTheme } from "../../types/common";

export const useAddTweetFormStyles = makeStyles(() => ({
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
        caretColor: localStorage.getItem(BACKGROUND) === BackgroundTheme.DEFAULT ? "#000" : "#fff",
        color: localStorage.getItem(BACKGROUND) === BackgroundTheme.DEFAULT ? "#000" : "#fff"
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
    footerAddForm: {
        display: "flex",
        alignItems: "center"
    }
}));
