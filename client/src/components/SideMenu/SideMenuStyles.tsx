import {makeStyles, Theme} from "@material-ui/core";

export const useSideMenuStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'sticky',
        top: 0,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        maxWidth: 230,
        "& li .selected" : {
            color: theme.palette.primary.main,
            "& svg": {
                fill: 'rgb(29, 161, 242)',
            },
        },
    },
    itemWrapper: {
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
    count: {
        position: "absolute",
        padding: 0,
        marginLeft: 13,
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: 'rgb(29, 161, 242)',
        fontSize: 11,
        color: "#fff",
        textAlign: "center"
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
