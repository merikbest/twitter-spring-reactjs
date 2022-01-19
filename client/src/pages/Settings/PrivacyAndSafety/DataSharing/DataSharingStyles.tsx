import {makeStyles, Theme} from "@material-ui/core";

export const useDataSharingStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    infoItem: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
}));
