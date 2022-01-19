import {makeStyles, Theme} from "@material-ui/core";

export const useConnectedAppsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    connectedAppsWrapper: {
        margin: "32px auto",
        width: 336,
        textAlign: "center"
    },
}));
