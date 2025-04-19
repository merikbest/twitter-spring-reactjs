import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useTweetErrorPageStyles } from "./TweetErrorPageStyles";
import { selectErrorMessage } from "../../../store/ducks/tweet/selectors";
import { SEARCH } from "../../../constants/path-constants";
import { useGlobalStyles } from "../../../util/globalClasses";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";

const TweetErrorPage = (): ReactElement => {
    const classes = useTweetErrorPageStyles();
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const errorMessage = useSelector(selectErrorMessage);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(setOpenSnackBar(errorMessage));
    }, []);

    return (
        <>
            <Typography variant="h5" component="div" className={classes.error}>
                {t("THIS_PAGE_DOESNT_EXIST", { defaultValue: "Hmm...this page doesn’t exist." })}
                <br />
                {t("TRY_SEARCHING", { defaultValue: "Try searching for something else." })}
            </Typography>
            <Link to={SEARCH} className={globalClasses.link}>
                <Button
                    className={classes.searchButton}
                    color="primary"
                    variant="contained"
                    size="small"
                >
                    {t("SEARCH", { defaultValue: "Search" })}
                </Button>
            </Link>
        </>
    );
};

export default TweetErrorPage;
