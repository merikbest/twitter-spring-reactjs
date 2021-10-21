import {makeStyles, Theme} from "@material-ui/core";

export const useSideMenuStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'sticky',
        top: 0,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        maxWidth: 230,
        "& li .selected": {
            color: theme.palette.primary.main,
            "& svg": {
                fill: 'rgb(29, 161, 242)',
            },
        },
    },
    itemWrapper: {
        marginBottom: 2,
        height: 58,
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
        '& svg': {
            verticalAlign: "bottom",
            height: "1.3em",
            marginRight: 15,
            marginBottom: 3,
        },
        cursor: 'pointer',
        '&:hover': {
            '& div': {
                backgroundColor: 'rgba(29, 161, 242, 0.1)',
                '& h6': {
                    color: theme.palette.primary.main,
                },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
        },

        '& div': {
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
            padding: '0 25px 0 20px',
            borderRadius: 30,
            height: 50,
            marginBottom: 3,
            transition: 'background-color 0.1s ease-in-out',
        },
    },
    logoIcon: {
        fontSize: 32,
    },
    label: {
        position: "relative",
        fontWeight: 700,
        fontSize: 20,
    },
    homeNotification: {
        position: "absolute",
        marginLeft: 18,
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: 'rgb(29, 161, 242)',
    },
    count: {
        position: "absolute",
        marginLeft: 10,
        width: 19,
        height: 19,
        borderRadius: "50%",
        border: "1px solid #fff",
        backgroundColor: 'rgb(29, 161, 242)',
        fontSize: 11,
        color: "#fff",
        textAlign: "center",
    },
    popover: {
        width: 198,
        height: "auto",
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        marginLeft: 40,
        marginTop: 50,
        "& .MuiAvatar-root": {
            width: "48px !important",
            height: "48px !important",
        },
        '& .MuiListItemText-root': {
            marginLeft: 8,
        },
        '& .MuiListItemText-primary': {
            fontSize: 15,
            fontWeight: 700,
        },
        '& .MuiTypography-body2': {
            fontSize: 15,
        },
        "& svg": {
            marginRight: 12,
            color: "rgb(15, 20, 25)",
            height: "1.30em",
        },
    },
    listItemWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0,
        },
        '& .MuiListItem-root': {
            color: "rgb(15, 20, 25)",
            padding: "16px 0px 16px 16px",
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgb(247, 249, 249)',
            },
            "& .MuiTypography-root": {
                fontWeight: 400,
                fontSize: 15,
                lineHeight: "20px",
            },
        },
        "& .MuiDivider-root": {
            backgroundColor: 'rgb(239, 243, 244)',
        },
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    button: {
        height: 48,
        padding: theme.spacing(3.2),
        marginTop: theme.spacing(2),
        "& .MuiButton-label": {
            fontSize: 15,
        },
    },
}));
