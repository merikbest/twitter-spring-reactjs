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
}));
