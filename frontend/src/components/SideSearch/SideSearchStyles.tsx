import { makeStyles } from "@material-ui/core";

export const useSideSearchStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        paddingTop: 4,
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 53,
        "& .MuiInputAdornment-positionEnd": {
            marginRight: 12
        }
    },
    dropdown: {
        padding: 0,
        position: "absolute",
        width: 300,
        minHeight: 100,
        top: 50,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiListItem-root": {
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        }
    }
}));