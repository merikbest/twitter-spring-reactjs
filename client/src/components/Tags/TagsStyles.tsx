import {makeStyles} from "@material-ui/core";

export const useTagsStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 15,
        marginTop: 20,
        '& .MuiList-root': {
            paddingTop: 0,
            '& .MuiListItemText-primary': {
                color: theme.palette.text.primary,
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
        display: "flex",
        justifyContent: "space-between",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'transparent',
        padding: '10px 18px',
        '& b': {
            fontSize: 20,
            fontWeight: 800,
        },
        "& .MuiIconButton-root": {
            width: 35,
            height: 35,
            color: theme.palette.text.secondary,
            "& svg" : {
                marginTop: 5,
                color: theme.palette.primary.main,
                height: "0.95em",
            },
        },
    },
    item: {
        cursor: 'pointer',
        borderBottom: `1px solid ${theme.palette.divider}`,
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
