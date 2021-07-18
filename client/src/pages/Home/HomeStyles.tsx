import {makeStyles, Theme} from "@material-ui/core";

export const useHomeStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        borderTop: '0',
        borderBottom: '0',
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
        '& h6': {
            fontWeight: 800,
        },
    },
    headerIcon: {
        display: "inline",
        "& .MuiIconButton-root": {
            marginLeft: 425,
            width: 40,
            height: 40,
            color: "rgb(29, 161, 242)",
            "& span": {
                paddingTop: 3,
                "& svg" : {
                    height: "0.90em",
                },
            },
        },
    },
    addForm: {
        padding: "20px 20px 0px 20px",
    },
    divider: {
        height: 12,
        backgroundColor: '#F7F9F9',
    },
    loading: {
        marginTop: 50,
        textAlign: 'center',
    },

}));
