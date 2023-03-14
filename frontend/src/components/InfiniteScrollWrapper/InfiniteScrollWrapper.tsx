import React, { FC, ReactElement, ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollWrapperProps {
    children: ReactNode;
    dataLength: number;
    pagesCount: number;
    loadItems: (page: number) => void;
}

const InfiniteScrollWrapper: FC<InfiniteScrollWrapperProps> = (
    {
        children,
        dataLength,
        pagesCount,
        loadItems
    }
): ReactElement => {
    const [page, setPage] = useState(1);

    const loadNextPage = (): void => {
        loadItems(page);
        setPage(prevState => prevState + 1);
    };

    return (
        <InfiniteScroll
            style={{ overflow: "unset" }}
            dataLength={dataLength}
            hasMore={page < pagesCount}
            next={loadNextPage}
            loader={null}
            scrollableTarget="scrollableDiv"
        >
            {children}
        </InfiniteScroll>
    );
};

export default InfiniteScrollWrapper;
