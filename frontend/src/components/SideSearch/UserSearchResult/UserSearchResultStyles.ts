import { makeStyles } from "@material-ui/core";

export const useUserSearchResultStyles = makeStyles(() => ({
    searchPersonResult: {
        height: 80
    },
    userInfo: {
        marginLeft: 12,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        "& .MuiTypography-h6, .MuiTypography-subtitle1": {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden"
        }
    },
    closeIconButton: {
        marginLeft: "auto",
        float: "right"
    }
}));
