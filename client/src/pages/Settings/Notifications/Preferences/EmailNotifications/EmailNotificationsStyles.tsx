import {makeStyles, Theme} from "@material-ui/core";

export const useEmailNotificationsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    itemTitle: {
        paddingBottom: 4,
    },
    switch: {
        marginTop: -9,
        float: "right",
    },
    infoItem: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
    emailNotificationsItemWrapper: {
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
