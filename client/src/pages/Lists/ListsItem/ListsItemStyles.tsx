import {makeStyles, Theme} from "@material-ui/core";

export const useListsItemStyles = makeStyles((theme: Theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: 'flex-start',
        padding: "12px 16px",
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    link: {
        textDecoration: "none",
    },
    listAvatar: {
        width: "50px !important",
        height: "50px !important",
        borderRadius: 12,
        marginRight: 15,
    },
    listInfoContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    listInfoWrapper: {
        display: "block",
    },
    listTitle: {
        lineHeight: "20px",
        fontSize: 15,
        fontWeight: 700,
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    listOwnerWrapper: {
        display: "inline-block",
        verticalAlign: "middle",
    },
    listOwnerAvatar: {
        marginRight: 4,
        width: "15px !important",
        height: "15px !important",
    },
    listOwnerInfoWrapper: {
        display: "inline-block",
    },
    listOwnerFullName: {
        fontSize: 13,
        lineHeight: "16px",
        marginRight: 4,
        fontWeight: 700,
    },
    listOwnerUsername: {
        fontSize: 13,
        lineHeight: "16px",
        color: theme.palette.text.secondary,
    },
    listPinWrapper: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                verticalAlign: "bottom",
                color: theme.palette.primary.main,
                height: "0.85em",
            },
        },
    },
    listPrimaryButton: {
        width: 105,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    listOutlinedButton: {
        width: 79,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));
