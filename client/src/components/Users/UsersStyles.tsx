import {makeStyles, Theme} from "@material-ui/core";

export const useUsersStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.secondary.main,
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
        borderBottom: `1px solid ${theme.palette.divider}`,
        '& b': {
            fontSize: 20,
            fontWeight: 800,
        },
    },
    footer: {
        fontSize: 16,
        color: theme.palette.primary.main,
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
            backgroundColor: theme.palette.secondary.dark,
        },
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
    },
}));
