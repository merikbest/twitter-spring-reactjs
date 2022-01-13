import {makeStyles, Theme} from "@material-ui/core";

export const useHomeStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
        paddingBottom: 500,
    },
    header: {
        position: "fixed",
        width: 602,
        height: 52,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '& .MuiTypography-h5': {
            marginLeft: 16,
        },
    },
    headerIcon: {
        display: "inline",
        "& .MuiIconButton-root": {
            padding: 7,
            marginLeft: 475,
            color: theme.palette.primary.main,
            "& svg": {
                height: "0.90em",
            },
        },
    },
    addForm: {
        padding: "72px 20px 0px 20px",
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider,
    },
}));
