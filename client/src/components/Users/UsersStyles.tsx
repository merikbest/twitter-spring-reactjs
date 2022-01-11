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
    },
    footer: {
        cursor: 'pointer',
        '& .MuiListItem-root .MuiListItem-gutters': {
            padding: "0px 0px 0px 0px",
        },
        '& .MuiTypography-subtitle1': {
            color: theme.palette.primary.main,
        },
        '& .MuiListItemAvatar-root': {
            minWidth: 50,
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
