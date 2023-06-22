import { makeStyles } from "@material-ui/core";

export const useListsItemStyles = makeStyles((theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: "flex-start",
        padding: "12px 16px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    listAvatar: {
        width: "50px !important",
        height: "50px !important",
        borderRadius: 12,
        marginRight: 15
    },
    listInfoContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    listInfoWrapper: {
        display: "block"
    },
    listTitle: {
        fontWeight: 700
    },
    listOwnerWrapper: {
        display: "inline-block",
        verticalAlign: "middle"
    },
    listOwnerAvatar: {
        marginRight: 4,
        width: "15px !important",
        height: "15px !important"
    },
    listOwnerInfoWrapper: {
        display: "inline-block"
    },
    listOwnerFullName: {
        marginRight: 4,
        fontWeight: 700,
        color: theme.palette.text.primary
    },
    listPinWrapper: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                verticalAlign: "bottom",
                color: theme.palette.primary.main,
                height: "0.85em"
            }
        }
    }
}));
