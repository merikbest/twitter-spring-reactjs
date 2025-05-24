import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { deleteList } from "../../../../../store/ducks/list/actionCreators";
import { LISTS } from "../../../../../constants/path-constants";
import { useModalWindow } from "../../../../../hook/useModalWindow";

export const useDeleteListModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { listId } = useParams<{ listId: string }>();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    const onDeleteList = useCallback((): void => {
        onCloseModalWindow();
        dispatch(deleteList(parseInt(listId)));
        history.push(LISTS);
    }, [dispatch, listId, history, onCloseModalWindow]);

    return { visibleModalWindow, onOpenModalWindow, onCloseModalWindow, onDeleteList };
};
