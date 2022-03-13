import {makeStyles, Theme} from "@material-ui/core";

export const useSideSearchStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        paddingTop: 4,
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 53,
    },
}));