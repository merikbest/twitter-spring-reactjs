import {makeStyles, Theme} from "@material-ui/core";

export const useAccountInformationStyles = makeStyles((theme: Theme) => ({
    listWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0,
        },
        "& .MuiListItem-root": {
            padding: "12px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgb(247, 249, 249)",
            },
        },
        "& svg": {
            color: "rgb(83, 100, 113)",
            height: "1.3em",
        },
    },
    title: {
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
    },
    text: {
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        lineHeight: "16px",
    },
    arrowIcon: {
        marginLeft: "auto"
    },
    informationItem: {
        padding: "12px 16px",
    },
    link: {
        fontSize: 13,
        cursor: "pointer",
        color: "rgb(29, 155, 240)",
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
}));
