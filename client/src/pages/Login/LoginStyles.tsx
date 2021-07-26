import {makeStyles, Theme} from "@material-ui/core";

export const useLoginStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 334,
        margin: "0 auto",
        "& svg": {
            marginTop: 20,
            color: "rgb(29, 161, 242)",
            fontSize: 45,
        },
    },
    error: {
        padding: "12px 16px",
        borderRadius: 12,
        marginBottom: 12,
        fontSize: 15,
        fontWeight: 400,
        backgroundColor: "rgb(255, 210, 218)",
    },
    input: {
        marginBottom: 24,
    },
    button: {
        height: 46,
        "& .MuiButton-label": {
            fontSize: 15,
        },
    },
    footer: {
        marginTop: 32,
        textAlign: "center",
        fontSize: 15,
        fontWeight: 400,
        "& a": {
            textDecoration: "none",
            color: "rgb(27, 149, 224)",
            "&:hover": {
                textDecoration: "underline",
            },
        },
    },
}));
