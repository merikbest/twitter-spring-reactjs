import {makeStyles, Theme} from "@material-ui/core";

export const useSpacesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    title: {
        paddingBottom: 4,
        fontWeight: 700,
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        lineHeight: "20px"
    },
    switch: {
        marginTop: -9,
        float: "right",
    },
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));
