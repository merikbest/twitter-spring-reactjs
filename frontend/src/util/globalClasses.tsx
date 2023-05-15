import { makeStyles, Theme } from "@material-ui/core";

interface UseGlobalStylesProps {
    dialogContentHeight?: number;
}

export const useGlobalStyles = makeStyles<Theme, UseGlobalStylesProps>((theme) => ({
    pageContainer: {
        borderRadius: 0,
        minHeight: "100vh",
        paddingBottom: 500,
        borderTop: 0,
        borderBottom: 0
    },
    pageHeader: {
        position: "fixed",
        width: 602,
        minHeight: 53,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0
    },
    contentWrapper: {
        paddingTop: 53
    },
    pageHeaderTitleWrapper: {
        marginLeft: 15
    },
    avatar: {
        width: "46px !important",
        height: "46px !important"
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: "none"
    },
    linkWrapper: {
        textDecoration: "none"
    },
    svgSmall: {
        "& svg": {
            width: "1.156rem",
            height: "1.156rem",
            fill: theme.palette.text.secondary
        }
    },
    svg: {
        "& svg": {
            width: "1.172rem",
            height: "1.172rem",
            fill: theme.palette.text.secondary
        }
    },
    svgLarge: {
        "& svg": {
            width: "1.75rem",
            height: "1.75rem"
        }
    },
    arrowIcon: {
        marginLeft: "auto"
    },
    itemInfoWrapper: {
        padding: "12px 16px"
    },
    listItemWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiListItem-root": {
            padding: "12px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        },
        "& svg": {
            color: theme.palette.text.secondary,
            width: "1.156rem",
            height: "1.156rem"
        }
    },
    listIconWrapper: {
        margin: "15px 30px 15px 15px"
    },
    infoItemCheckbox: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10
        }
    },
    infoItemRadioCheckbox: {
        padding: "9px 0px",
        "& .MuiButtonBase-root": {
            padding: 4,
            float: "right",
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            }
        }
    },
    switch: {
        marginTop: -9,
        float: "right"
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
            height: "1.156rem"
        }
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTabs-indicator": {
            marginLeft: 116,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontWeight: 700
        }
    },
    tab: {
        minWidth: 299,
        textTransform: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    infoText: {
        margin: "32px auto",
        width: 336,
        textAlign: "center"
    },
    userPageIconButton: {
        "& .MuiIconButton-root": {
            marginTop: 84,
            marginRight: 9,
            border: "1px solid",
            borderRadius: "50%",
            padding: 8,
            "& svg": {
                color: theme.palette.primary.main,
                height: 23,
                width: 23
            }
        }
    },
    modalShadow: {
        "& .MuiPaper-elevation24": {
            boxShadow: "none"
        }
    },
    dialogContent: {
        height: props => props.dialogContentHeight ?? 550,
        width: 598,
        padding: 0,
        overflowX: "hidden"
    }
}));
