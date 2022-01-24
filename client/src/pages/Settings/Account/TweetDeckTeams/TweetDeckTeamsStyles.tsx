import {makeStyles, Theme} from "@material-ui/core";

export const useTweetDeckTeamsStyles = makeStyles((theme: Theme) => ({
    title: {
        paddingBottom: 4,
    },
    switch: {
        float: "right",
    },
    tweetDeckItemWrapper: {
        padding: "4px 0px",
        "& .MuiButtonBase-root": {
            padding: 4,
            float: "right",
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            },
        },
    },
}));
