import {makeStyles, Theme} from "@material-ui/core";

export const useGlobalStyles = makeStyles((theme: Theme) => ({
    avatar: {
        width: "46px !important",
        height: "46px !important",
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
    linkWrapper: {
        textDecoration: "none",
    },
    svgSmall: {
        "& svg": {
            width: "1.156rem",
            height: "1.156rem",
            fill: theme.palette.text.secondary,
        },
    },
    svg: {
        "& svg": {
            width: "1.25rem",
            height: "1.25rem",
            fill: theme.palette.text.secondary,
        },
    },
    svgLarge: {
        "& svg": {
            width: "1.75rem",
            height: "1.75rem",
        },
    },
    arrowIcon: {
        marginLeft: "auto"
    },
    itemInfoWrapper: {
        padding: "12px 16px",
    },
    listItemWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiListItem-root": {
            padding: "12px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main,
            },
        },
        "& svg": {
            color: theme.palette.text.secondary,
            width: "1.156rem",
            height: "1.156rem",
        },
    },
    listIconWrapper: {
        margin: "15px 30px 15px 15px",
    },
    infoItemCheckbox: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
    infoItemRadioCheckbox: {
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
    switch: {
        marginTop: -9,
        float: "right",
    },
    contentLink: {
        padding: "12px 16px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer"
        },
        "& svg": {
            float: "right",
            color: theme.palette.text.secondary,
            width: "1.156rem",
            height: "1.156rem",
        },
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    tab: {
        minWidth: 299,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    infoText: {
        margin: "32px auto",
        width: 336,
        textAlign: "center",
    },
}));
