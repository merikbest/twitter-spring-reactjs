import {makeStyles, Theme} from "@material-ui/core";

export const useSpacesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    title: {
        paddingBottom: 4,
        fontWeight: 700,
        fontSize: 15,
        color: theme.palette.text.primary,
        lineHeight: "20px"
    },
    switch: {
        marginTop: -9,
        float: "right",
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));
