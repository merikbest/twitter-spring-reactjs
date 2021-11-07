import {makeStyles, Theme} from "@material-ui/core";
import Autoplay from "./Autoplay";

export const useAutoplayStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    subtitle: {
        color: "rgb(15, 20, 25)",
        fontWeight: 700,
        fontSize: 15,
        lineHeight: "20px",
        marginBottom: 4,
    },
    text: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px",
        marginBottom: 4,
    },
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    autoplayItemWrapper: {
        padding: "4px 0px",
        "& .MuiTypography-root": {
            fontSize: 15,
            color: "rgb(15, 20, 25)",
            fontWeight: 400,
            lineHeight: "20px",
        },
        "& .MuiButtonBase-root": {
            padding: 4,
            float: "right",
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            },
        },
    },
}));
