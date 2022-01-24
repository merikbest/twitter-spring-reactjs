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
        justifyContent: "space-between",
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '& .MuiTypography-h5': {
            marginLeft: 16,
            display: "inline-block",
            verticalAlign: "middle",
        },
    },
    headerIcon: {
        paddingRight: 10,
    },
    addForm: {
        padding: "72px 20px 0px 20px",
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider,
    },
}));
