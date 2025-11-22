import React, { FC, ReactElement } from "react";
import { Link as MuiLink, List, ListItem, Typography } from "@material-ui/core";
import { Trans, useTranslation } from "react-i18next";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { Link } from "react-router-dom";

import { ArrowRightIcon } from "../../../../../icons";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { useEditBirthDateStyles } from "./EditBirthDateStyles";
import { TWITTER_NOTICES, TWITTER_PRIVACY } from "../../../../../constants/url-constants";
import EditBirthDateModal from "./EditBirthDateModal";
import { EditProfileFormProps } from "../useEditProfileModal";
import useEditBirthDate from "./useEditBirthDate";
import BirthDateSelect from "./BirthDateSelect";
import { useDateSelector } from "../../../../../hook/useDateSelector";
import { BirthDateVisibility } from "../../../../../store/ducks/user/contracts/state";

interface EditBirthDateProps {
    control: Control<EditProfileFormProps, any>;
    watch: UseFormWatch<EditProfileFormProps>;
    errors: FieldErrors<EditProfileFormProps>;
}

const EditBirthDate: FC<EditBirthDateProps> = ({ control, watch, errors }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useEditBirthDateStyles();
    const { t } = useTranslation();
    const { showYears, showDays } = useDateSelector();
    const {
        visibleEditBirthDateModal,
        visibleEditBirthDateForm,
        visibilityDefaults,
        onOpenEditBirthDateModal,
        onCloseEditBirthDateModal,
        onOpenEditBirthDateForm,
        onCloseEditBirthDateForm,
    } = useEditBirthDate();

    return (
        <div className={classes.editBirthDateWrapper}>
            {(!visibleEditBirthDateForm) ? (
                <div className={globalClasses.listItemWrapper}>
                    <List>
                        <ListItem onClick={onOpenEditBirthDateModal}>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("BIRTH_DATE", { defaultValue: "Birth date" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("ADD_YOUR_DATE_OF_BIRTH", { defaultValue: "Add your date of birth" })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </List>
                </div>
            ) : (
                <>
                    <Typography variant="h6" component="span">
                        {t("BIRTH_DATE", { defaultValue: "Birth date" })}
                    </Typography>
                    {" · "}
                    <Typography
                        onClick={onCloseEditBirthDateForm}
                        className={classes.cancel}
                        variant="subtitle1"
                        component="span"
                    >
                        {t("CANCEL", { defaultValue: "Cancel" })}
                    </Typography>
                    <Typography variant="subtitle2" component="div" className={classes.description}>
                        {t("BIRTH_DATE_DESCRIPTION", {
                            defaultValue: "This should be the date of birth of the person using the account. " +
                                "Even if you’re making an account for your business, event, or cat."
                        })}
                    </Typography>
                    <Typography variant="subtitle2" component="div" className={classes.description}>
                        <Trans
                            i18nKey={t("BIRTH_DATE_SUB_DESCRIPTION", {
                                defaultValue: "Twitter uses your age to customize your experience, including ads, " +
                                    "as explained in our Privacy Policy."
                            })}
                            components={{
                                privacyPolicy: <MuiLink component={Link} variant="subtitle2" to={TWITTER_PRIVACY} />
                            }}
                        />
                    </Typography>
                    <div className={classes.formControl}>
                        <BirthDateSelect
                            name="month"
                            label={t("MONTH", { defaultValue: "Month" })}
                            control={control}
                            defaultValue={0}
                            error={!!errors.month && !!errors.birthdate}
                            width={265}
                            marginRight={12}
                        >
                            <option value={0} aria-label="None" />
                            <option value={1}>{t("JANUARY", { defaultValue: "January" })}</option>
                            <option value={2}>{t("FEBRUARY", { defaultValue: "February" })}</option>
                            <option value={3}>{t("MARCH", { defaultValue: "March" })}</option>
                            <option value={4}>{t("APRIL", { defaultValue: "April" })}</option>
                            <option value={5}>{t("MAY", { defaultValue: "May" })}</option>
                            <option value={6}>{t("JUNE", { defaultValue: "June" })}</option>
                            <option value={7}>{t("JULY", { defaultValue: "July" })}</option>
                            <option value={8}>{t("AUGUST", { defaultValue: "August" })}</option>
                            <option value={9}>{t("SEPTEMBER", { defaultValue: "September" })}</option>
                            <option value={10}>{t("OCTOBER", { defaultValue: "October" })}</option>
                            <option value={11}>{t("NOVEMBER", { defaultValue: "November" })}</option>
                            <option value={12}>{t("DECEMBER", { defaultValue: "December" })}</option>
                        </BirthDateSelect>
                        <BirthDateSelect
                            name="day"
                            label={t("DAY", { defaultValue: "Day" })}
                            control={control}
                            defaultValue={0}
                            error={!!errors.day && !!errors.birthdate}
                            width={125}
                            marginRight={12}
                        >
                            <option value={0} aria-label="None" />
                            {showDays(watch("month"), watch("year"))}
                        </BirthDateSelect>
                        <BirthDateSelect
                            name="year"
                            label={t("YEAR", { defaultValue: "Year" })}
                            control={control}
                            defaultValue={0}
                            error={!!errors.year && !!errors.birthdate}
                            width={143}
                        >
                            <option value={0} aria-label="None" />
                            {showYears()}
                        </BirthDateSelect>
                    </div>
                    {((errors.month || errors.day|| errors.year) && errors.birthdate) && (
                        <Typography color="error">
                            {errors.birthdate?.message}
                        </Typography>
                    )}
                    <Typography variant="h6" component="div" style={{ padding: "16px 0px" }}>
                        {t("WHO_SEES_THIS", { defaultValue: "Who sees this?" })}
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {t("WHO_SEES_THIS_DESCRIPTION", {
                            defaultValue: "You can control who sees your birthday on Twitter."
                        })}
                    </Typography>
                    {" "}
                    <MuiLink href={TWITTER_NOTICES} target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                    <div style={{ margin: "20px 0px 36px" }}>
                        <BirthDateSelect
                            name="monthAndDayVisibility"
                            label={t("MONTH_AND_DAY", { defaultValue: "Month and day" })}
                            control={control}
                            defaultValue={BirthDateVisibility.YOUR_FOLLOWERS}
                            width={560}
                        >
                            {Object.values(BirthDateVisibility).map(value => (
                                <option key={value} value={value}>
                                    {t(value, { defaultValue: visibilityDefaults[value] })}
                                </option>
                            ))}
                        </BirthDateSelect>
                    </div>
                    <BirthDateSelect
                        name="yearVisibility"
                        label={t("YEAR", { defaultValue: "Year" })}
                        control={control}
                        defaultValue={BirthDateVisibility.ONLY_YOU}
                        width={560}
                    >
                        {Object.values(BirthDateVisibility).map(value => (
                            <option key={value} value={value}>
                                {t(value, { defaultValue: visibilityDefaults[value] })}
                            </option>
                        ))}
                    </BirthDateSelect>
                </>
            )}
            <EditBirthDateModal
                visibleEditBirthDateModal={visibleEditBirthDateModal}
                onCloseEditBirthDateModal={onCloseEditBirthDateModal}
                onOpenEditBirthDateForm={onOpenEditBirthDateForm}
            />
        </div>
    );
};

export default EditBirthDate;
