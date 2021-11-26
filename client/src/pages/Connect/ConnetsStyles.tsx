import {makeStyles, Theme} from "@material-ui/core";

export const useConnectStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: 48,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        '& h6': {
            margin: "10px 20px",
            fontWeight: 800,
        },
    },
    content: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
    },
}));
