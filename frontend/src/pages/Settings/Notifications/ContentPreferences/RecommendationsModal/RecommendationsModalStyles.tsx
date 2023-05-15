import { makeStyles, Theme } from "@material-ui/core";

export const useRecommendationsModalStyles = makeStyles((theme: Theme) => ({
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 34,
            color: theme.palette.primary.main
        }
    },
    contentWrapper: {
        margin: "0px 32px"
    },
    infoText: {
        padding: "12px 0px"
    }
}));
