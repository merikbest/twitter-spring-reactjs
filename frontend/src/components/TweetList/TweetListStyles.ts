import { makeStyles, Theme } from "@material-ui/core";

export const useTweetListStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 506,
        height: 250,
        border: `1px solid ${theme.palette.info.light}`,
        marginTop: 12,
        borderRadius: 20,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.03)"
        }
    },
    wallpaper: {
        width: "100%",
        borderRadius: "20px 20px 0px 0px"
    },
    contentInfo: {
        padding: "4px 12px 12px 12px",
    },
    listIcon: {
        display: "inline-block",
        marginRight: 2,
        "& svg": {
            verticalAlign: "middle",
            color: theme.palette.text.secondary,
            height: "0.8rem",
            width: "0.8rem"
        }
    },
    listName: {
        fontWeight: 700,
    },
    listTitle: {
        margin: "4px 0px",
        fontWeight: 700,
        color: theme.palette.text.primary
    },
    listOwnerFullName: {
        color: theme.palette.text.primary
    },
    listOwnerAvatar: {
        marginRight: 4,
        verticalAlign: "middle",
        display: "inline-flex",
        width: "16px !important",
        height: "16px !important"
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            width: 13,
            height: 13
        }
    }
}));
