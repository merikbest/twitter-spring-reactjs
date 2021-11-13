import {makeStyles, Theme} from "@material-ui/core";

export const useLayoutStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        height: '100vh',
    },
    leftSideGrid: {
        "& .MuiGrid-item": {
            minWidth: "256px",
            padding: "12px 0px",
        },
    },
    rightSideGrid: {
        "& .MuiGrid-item": {
            position: "fixed",
            minWidth: "350px",
            padding: "12px 0px",
            marginLeft: 12,
        },
    },
    rightSide: {
        paddingTop: 4,
        position: 'sticky',
        top: 0,
    },
    footer: {
        padding: "16px 16px",
        "& .MuiTypography-root": {
            paddingRight: 12,
            lineHeight: "16px",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 400,
            color: "rgb(83, 100, 113)",
            "&:hover": {
                textDecoration: "underline",
            },
        },
        "& svg": {
            verticalAlign: "unset",
            color: "rgb(83, 100, 113)",
            height: "0.8em",
        },
        "& a": {
            textDecoration: "none",
        },
    },
}));
