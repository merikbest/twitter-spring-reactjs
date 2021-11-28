import {makeStyles, Theme} from "@material-ui/core";

export const useChangeGenderStyles = makeStyles((theme: Theme) => ({
    text: {
        padding: "12px 16px",
        fontSize: 15,
        color: theme.palette.text.secondary,
        fontWeight: 400,
        lineHeight: "20px",
    },
    genderInfoWrapper: {
        padding: "12px 16px",
    },
    genderItemWrapper: {
        padding: "4px 0px",
        "& .MuiTypography-root": {
            fontSize: 15,
            color: theme.palette.text.primary,
            fontWeight: 400,
            lineHeight: "20px",
        },
        "& .MuiButtonBase-root": {
            padding: 4,
            float: "right",
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            },
        },
    },
    textFieldWrapper: {
        paddingTop: "24px",
    },
    buttonWrapper: {
        padding: "12px 16px",
        float: "right",
        height: 30,
    },
}));
