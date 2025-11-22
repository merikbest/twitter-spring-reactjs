import { useState } from "react";
import { BirthDateVisibility } from "../../../../../store/ducks/user/contracts/state";

const useEditBirthDate = () => {
    const [visibleEditBirthDateModal, setVisibleEditBirthDateModal] = useState<boolean>(false);
    const [visibleEditBirthDateForm, setVisibleEditBirthDateForm] = useState<boolean>(false);
    const visibilityDefaults: Record<BirthDateVisibility, string> = {
        [BirthDateVisibility.PUBLIC]: "Public",
        [BirthDateVisibility.YOUR_FOLLOWERS]: "Your followers",
        [BirthDateVisibility.PEOPLE_YOU_FOLLOW]: "People you follow",
        [BirthDateVisibility.YOU_FOLLOW_EACH_OTHER]: "You follow each other",
        [BirthDateVisibility.ONLY_YOU]: "Only you"
    };

    const onOpenEditBirthDateModal = (): void => {
        setVisibleEditBirthDateModal(true);
    };

    const onCloseEditBirthDateModal = (): void => {
        setVisibleEditBirthDateModal(false);
    };

    const onOpenEditBirthDateForm = (): void => {
        setVisibleEditBirthDateModal(false);
        setVisibleEditBirthDateForm(true);
    };

    const onCloseEditBirthDateForm = (): void => {
        setVisibleEditBirthDateForm(false);
    };

    return {
        visibleEditBirthDateModal,
        visibleEditBirthDateForm,
        visibilityDefaults,
        onOpenEditBirthDateModal,
        onCloseEditBirthDateModal,
        onOpenEditBirthDateForm,
        onCloseEditBirthDateForm,
    };
};

export default useEditBirthDate;
