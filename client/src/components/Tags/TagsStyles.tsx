import {makeStyles} from "@material-ui/core";

export const useTagsStyles = makeStyles((theme) => ({
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
        display: "flex",
        justifyContent: "space-between",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: "1px solid rgb(239, 243, 244)",
        backgroundColor: 'transparent',
        padding: '10px 18px',
        '& b': {
            fontSize: 20,
            fontWeight: 800,
        },
        "& .MuiIconButton-root": {
            width: 35,
            height: 35,
            color: "rgb(83, 100, 113)",
            "& svg" : {
                marginTop: 5,
                color: "rgb(27, 149, 224)",
                height: "0.95em",
            },
        },
    },
    item: {
        cursor: 'pointer',
        borderBottom: "1px solid rgb(239, 243, 244)",
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
