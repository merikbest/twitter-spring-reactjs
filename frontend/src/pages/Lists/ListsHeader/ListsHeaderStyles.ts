import { makeStyles } from "@material-ui/core";

export const useListsHeaderStyles = makeStyles((theme) => ({
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10
    },
    icon: {
        display: "inline-block"
    },
    dropdownLink: {
        color: "black",
        textDecoration: "none"
    },
    dropdown: {
        padding: 16,
        position: "absolute",
        width: 165,
        height: 52,
        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    },
    textIcon: {
        "& svg": {
            verticalAlign: -3,
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    }
}));
