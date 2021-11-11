import {Select, SelectProps, styled} from "@material-ui/core";

export const ScheduleModalSelect = styled((props: SelectProps) => (
    <Select {...props}/>
))(({theme}) => ({
    '& .MuiSelect-filled': {
        border: "1px solid #C4C4C4",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "#fff",
        '&:hover': {
            backgroundColor: '#fff',
        },
        "&:focused" : {
            border: 0,
        },
    },
    "& .MuiSelect-root": {
        "&:focused" : {
            border: 0,
        },
    },
    '&.Mui-focused': {
        backgroundColor: '#fff',
        "& .MuiSelect-root": {
            borderColor: "transparent",
            boxShadow: "0 0 0 2px rgb(29, 161, 242)",
        },
    },
    "&.MuiFilledInput-underline": {
        '&:before': {
            border: 0,
        },
        '&:after': {
            border: 0,
        },
    },
}));
