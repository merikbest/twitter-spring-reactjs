import {colors, makeStyles, Theme} from "@material-ui/core";

export const useUserSideProfileStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        bottom: 13,
        padding: '10px 15px',
        width: 245,
        borderRadius: 50,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: colors.lightBlue[50],
        },
    },
    icon: {
        "& svg": {
            color: "rgb(83, 100, 113)",
            marginTop: 5,
            height: "1.4em",
        },
    },
    info: {
        flex: 1,
        marginLeft: 10,
        '& b': {
            fontSize: 16,
        },
    },
    menu: {
        top: 'auto !important',
        left: '17.5% !important',
        width: '250px !important',
        bottom: '110px !important',
        'box-shadow': '1px 1px 10px rgba(0, 0, 0, 0.08)',
        'border-radius': '20px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '& a': {
            color: 'black',
            textDecoration: 'none',
        },
    },
    popover: {
        width: 300,
        height: 202,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        borderRadius: 16,
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
        "& span": {
            "& svg" : {
                color: "rgba(29, 161, 242, 1.00)",
                height: "1.30em",
            },

        },
    },
    listItemWrapper: {
        '& .MuiListItem-root': {
            padding: 16,
            fontWeight: 400,
            fontSize: 15,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgb(247, 249, 249)',
            },
        },
        "& .MuiDivider-root": {
            backgroundColor: 'rgb(239, 243, 244)',
        },
    },
    modalWrapper: {
        width: 280,
        height: 212,
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: "rgb(29, 161, 242)",
            fontSize: 45,
        },
    },
    modalFullName: {
        color: "rgb(15, 20, 25)",
        fontWeight: 700,
        fontSize: 20,
    },
    modalUsername: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
        marginTop: 8,
        marginBottom: 24,
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalCancelButton: {
        width: 134,
        height: 40,
        color: "#000",
        backgroundColor: "rgb(239, 243, 244)",
        borderRadius: '25px',
    },
    modalLogoutButton: {
        width: 134,
        height: 40,
        border: '1px solid',
        borderRadius: '25px',
    },
}));
