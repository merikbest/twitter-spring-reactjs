import { useDispatch, useSelector } from "react-redux";

import { selectIsLoading } from "../../../store/ducks/authentication/selector";
import { setCloseModal } from "../../../store/ducks/authentication/actionCreators";

export const useDialogWrapper = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const onClose = (): void => {
        dispatch(setCloseModal());
    };

    return { isLoading, onClose };
};
