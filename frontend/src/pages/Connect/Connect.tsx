import React, { FC, ReactElement } from "react";

import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useConnect } from "./useConnect";

const Connect: FC = (): ReactElement => {
    const { users, isUsersLoading, pagesCount, loadUsers } = useConnect();

    return (
        <PageWrapper translationKey="CONNECT" defaultValue="Connect">
            <InfiniteScrollWrapper dataLength={users.length} pagesCount={pagesCount} loadItems={loadUsers}>
                <ConnectToUsers
                    translationKey="SUGGESTED_FOR_YOU"
                    defaultValue="Suggested for you"
                    isUsersLoading={isUsersLoading}
                    users={users}
                />
            </InfiniteScrollWrapper>
        </PageWrapper>
    );
};

export default withDocumentTitle(Connect)("Connect");
