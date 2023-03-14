import { makeStyles, Theme } from "@material-ui/core";

interface PopperUserWindowStylesProps {
    isTweetComponent?: boolean;
}

export const usePopperUserWindowStyles = makeStyles<Theme, PopperUserWindowStylesProps>((theme) => ({
    popperUserWindow: {
        position: "absolute",
        width: 300,
        minHeight: "auto",
        padding: 16,
        zIndex: 2,
        marginTop: props => props.isTweetComponent ? 0 : -20,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        cursor: "default",
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px"
    },
    tweetComponent: {
        left: props => props.isTweetComponent ? -100 : -50
    },
    tweetImageModal: {
        marginTop: -10,
        right: 20
    }
}));
