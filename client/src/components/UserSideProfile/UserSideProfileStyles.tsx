import {colors, makeStyles, Theme} from "@material-ui/core";

export const useUserSideProfileStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        bottom: 30,
        padding: '10px 15px',
        width: 260,
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
}));
