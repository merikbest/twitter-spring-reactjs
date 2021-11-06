import {makeStyles, Theme} from "@material-ui/core";

export const useMutedWordsStyles = makeStyles((theme: Theme) => ({
    mutedWordsInfo: {
        margin: "32px auto",
        width: 336,
        textAlign: "center",
    },
    title: {
        lineHeight: "36px",
        fontSize: 31,
        fontWeight: 800,
        color: "rgb(15, 20, 25)",
        marginBottom: 8
    },
    subTitle: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
    },
    link: {
        display: "block",
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));
