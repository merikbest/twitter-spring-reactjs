import {makeStyles} from "@material-ui/core";

export const useAuthenticationStyles= makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        height: '100vh',
        "& .MuiDialog-root": {
            marginTop: 92
        },
        "& .MuiDialog-container": {
            paddingTop: 0,
            paddingBottom: 0
        },
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: "0 0 50%",
        backgroundColor: '#71C9F8',
        overflow: 'hidden',
        position: 'relative'
    },
    leftSideListInfo: {
        position: 'relative',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: 400,
        "& .MuiListItem-root": {
            width: "auto",
            color: theme.palette.text.secondary,
            padding: 0,
            marginBottom: 40,
            "& svg": {
                marginRight: 15,
                verticalAlign: "centered",
                fill: theme.palette.common.white,
                height: "1.5em",
            },
        },
        '& h6': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 20
        }
    },
    leftSideIcon: {
        fontSize: 32,
        marginRight: 15
    },
    leftSideTwitterIcon: {
        position: 'absolute',
        left: '50%',
        top: '53%',
        transform: 'translate(-50%, -50%)',
        width: '350%',
        height: '350%',
    },
    rightSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 50%',
    },
    rightSideWrapper: {
        width: 380
    },
    rightSideTwitterIcon: {
        fontSize: 45
    },
    rightSideTittle: {
        fontWeight: 700,
        fontSize: 32,
        marginBottom: 45,
        marginTop: 20
    },
    loginSideField: {
        marginBottom: 18,
    },
    registerField: {
        marginBottom: theme.spacing(5),
    },
    loginFormControl: {
        marginBottom: theme.spacing(2),
    },
    signinButton: {
        height: 45,
        marginBottom: 20
    },
}));
