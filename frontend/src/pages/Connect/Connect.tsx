import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../../store/ducks/users/actionCreators";
import { selectPagesCount, selectUsers, selectUsersIsLoading } from "../../store/ducks/users/selectors";
import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const Connect: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);
    const pagesCount = useSelector(selectPagesCount);

    useEffect(() => {
        loadUsers(0);
        window.scrollTo(0, 0);

        // TODO reset state after history.goBack()
        // return () => {
        //     dispatch(resetUsersState());
        // };
    }, []);

    const loadUsers = (page: number): void => {
        dispatch(fetchUsers(page));
    };

    return (
        <PageWrapper title={"Connect"}>
            <InfiniteScrollWrapper dataLength={users.length} pagesCount={pagesCount} loadItems={loadUsers}>
                <ConnectToUsers title={"Suggested for you"} isUsersLoading={isUsersLoading} users={users} />
            </InfiniteScrollWrapper>
        </PageWrapper>
    );
};

export default withDocumentTitle(Connect)("Connect");
