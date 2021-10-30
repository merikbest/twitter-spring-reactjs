import {makeStyles, Theme} from "@material-ui/core";

export const useLoggedDevicesStyles = makeStyles((theme: Theme) => ({
    container: {
        minWidth: 600,
        "& .MuiPaper-outlined": {
            padding: 0,
            borderRadius: 0,
            minHeight: '100vh',
            borderLeft: 0,
            borderTop: 0,
            borderBottom: 0,
        },
    },
    infoWrapper: {
        paddingTop: 53
    },
    infoItemWrapper: {
        padding: "12px 16px"
    },
}));
