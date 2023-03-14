import { makeStyles, Theme } from "@material-ui/core";

export const useLockIconStyles = makeStyles((theme: Theme) => ({
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em"
        }
    }
}));
