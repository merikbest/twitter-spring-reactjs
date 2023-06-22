import { makeStyles } from "@material-ui/core";

export const useTopTweetActionsStyles = makeStyles((theme) => ({
    headerIcon: {
        paddingRight: 10
    },
    dropdown: {
        padding: 0,
        position: "absolute",
        width: 356,
        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiListItem-root": {
            padding: 16,
            "&:hover": {
                borderRadius: 4,
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        }
    },
    dropdownHeader: {
        textAlign: "center",
        padding: "16px 20px",
        "& .MuiTypography-h5": {
            marginLeft: 0
        }
    },
    dropdownHeaderImage: {
        width: 50,
        height: 50,
        margin: "0px auto",
        marginBottom: 12
    },
    listItemWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    textIcon: {
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    }
}));