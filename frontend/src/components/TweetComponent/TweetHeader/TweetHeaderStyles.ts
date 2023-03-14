import { makeStyles } from "@material-ui/core";

export const useTweetHeaderStyles = makeStyles((theme) => ({
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            width: 16,
            height: 16
        }
    }
}));
