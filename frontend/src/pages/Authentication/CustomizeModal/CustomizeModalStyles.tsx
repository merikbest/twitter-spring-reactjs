import { makeStyles } from "@material-ui/core";

export const useCustomizeModalStyles = makeStyles(() => ({
    title: {
        marginBottom: 44
    },
    subtitle: {
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 12,
        lineHeight: "20px"
    },
    text: {
        width: 450,
        display: "inline-block",
        marginBottom: 40
    },
    radio: {
        display: "inline-block",
        marginBottom: 45,
        "& svg": {
            width: 16,
            height: 16
        }
    }
}));
