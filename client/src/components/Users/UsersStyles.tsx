import {makeStyles, Theme} from "@material-ui/core";

export const useUsersStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: '#F7F9F9',
        borderRadius: 15,
        marginTop: 20,
        '& .MuiList-root': {
            paddingTop: 0,
            '& .MuiListItemText-primary': {
                color: 'black',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
            '& a': {
                textDecoration: 'none',
            }
        },
    },
    header: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        backgroundColor: 'transparent',
        padding: '13px 18px',
        borderBottom: "1px solid rgb(239, 243, 244)",
        '& b': {
            fontSize: 20,
            fontWeight: 800,
        },
    },
    loading: {
        marginTop: 50,
        textAlign: 'center',
    },
    footer: {
        fontSize: 16,
        color: "rgb(27, 149, 224)",
        cursor: 'pointer',
        '& .MuiListItem-root .MuiListItem-gutters': {
            padding: "0px 0px 0px 0px",
        },
        '& .MuiTypography-body1': {
            fontWeight: 700,
        },
        '& .MuiListItemAvatar-root': {
            minWidth: 50,
        },
        '& .MuiListItemText-root': {
            // marginRight: 45,
        },
        '&:hover': {
            backgroundColor: '#edf3f6',
        },
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
    },
}));
