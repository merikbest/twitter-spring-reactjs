import {makeStyles, Theme} from "@material-ui/core";
import {UserItemSize} from "./UsersItem";

interface UsersItemStylesProps {
    size?: UserItemSize
}

export const useUsersItemStyles = makeStyles<Theme , UsersItemStylesProps>((theme) => ({
    container: {
        cursor: 'pointer',
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
    },
    userInfo: {
        marginLeft: 12,
        width: props => (props.size === UserItemSize.SMALL) ? 120 : 360,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        "& .MuiTypography-h6, .MuiTypography-subtitle1": {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
        },
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    buttonWrapper: {
        flex: 1,
        "& .MuiButton-root": {
            float: 'right',
        },
    },
    outlinedButton: {
        width: 79,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    containedButton: {
        width: 105,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    blockButton: {
        backgroundColor: theme.palette.error.main,
    },
}));
