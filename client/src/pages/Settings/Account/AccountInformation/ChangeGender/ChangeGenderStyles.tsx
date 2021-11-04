import {makeStyles, Theme} from "@material-ui/core";

export const useChangeGenderStyles = makeStyles((theme: Theme) => ({
    text: {
        padding: "12px 16px",
        fontSize: 15,
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        lineHeight: "20px",
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    genderInfoWrapper: {
        padding: "12px 16px",
    },
    genderItemWrapper: {
        padding: "4px 0px",
        "& .MuiTypography-root": {
            fontSize: 15,
            color: "rgb(15, 20, 25)",
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
