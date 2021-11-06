import {makeStyles, Theme} from "@material-ui/core";

export const useLocationStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    infoItem: {
        paddingBottom: 12,
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    adsPreferencesWrapper: {
        textDecoration: "none",
    },
    adsPreferencesLink: {
        padding: "12px 16px",
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
        "&:hover": {
            backgroundColor: "rgb(247, 249, 249)",
            cursor: "pointer"
        },
        "& svg": {
            float: "right",
            color: "rgb(83, 100, 113)",
            height: "1.4em"
        },
    },
}));
