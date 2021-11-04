import {makeStyles, Theme} from "@material-ui/core";

export const useAppsAndSessionsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        lineHeight: "16px",
    },
    listWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0,
        },
        "& .MuiListItem-root": {
            padding: "14px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgb(247, 249, 249)",
            },
        },
        "& .MuiTypography-root": {
            fontSize: 15,
            fontWeight: 400,
            lineHeight: "20px",
            color: "rgb(15, 20, 25)",
        },
        "& .Mui-selected": {
            borderRight: "2px solid rgb(27, 149, 224)",
            "& svg": {
                marginRight: "-2px"
            },
        },
        "& svg": {
            color: "rgb(83, 100, 113)",
            height: "1.4em",
            marginLeft: "auto",
        },
    },
}));
