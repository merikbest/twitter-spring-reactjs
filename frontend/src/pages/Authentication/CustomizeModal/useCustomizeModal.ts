import { useDispatch, useSelector } from "react-redux";

import { selectRegistrationStep2 } from "../../../store/ducks/authentication/selector";
import { setRegistrationStep } from "../../../store/ducks/authentication/actionCreators";
import { RegistrationStep } from "../../../types/auth";

export const useCustomizeModal = () => {
    const dispatch = useDispatch();
    const registrationStep2 = useSelector(selectRegistrationStep2);

    const onOpenCreateAccount = (): void => {
        dispatch(setRegistrationStep(RegistrationStep.STEP_3));
    };

    return { registrationStep2, onOpenCreateAccount };
};
