import { makeStyles, Theme } from "@material-ui/core";

export const useTopTweetsItemStyles = makeStyles((theme: Theme) => ({
    listItemWrapper: {
        display: "flex",
        justifyContent: "flex-start"
    },
    textIcon: {
        paddingTop: 20,
        "& svg": {
            verticalAlign: "bottom",
            marginRight: 15,
            fill: theme.palette.text.secondary,
            height: "1.30em"
        }
    }
}));
