import { makeStyles } from "@material-ui/core";

export const usePageWrapperStyles = makeStyles(() => ({
    header: {
        justifyContent: "space-between",
        "& .MuiTypography-h5": {
            marginLeft: 16,
            display: "inline-block",
            verticalAlign: "middle"
        }
    }
}));
