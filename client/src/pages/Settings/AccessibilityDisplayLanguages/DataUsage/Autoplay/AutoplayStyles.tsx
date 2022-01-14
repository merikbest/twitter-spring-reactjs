import {makeStyles, Theme} from "@material-ui/core";

export const useAutoplayStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px",
        "& .MuiTypography-h6, .MuiTypography-subtitle2": {
            marginBottom: 4,
        },
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    autoplayItemWrapper: {
        padding: "4px 0px",
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
