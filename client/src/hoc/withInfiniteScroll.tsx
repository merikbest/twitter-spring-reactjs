import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {selectPagesCount} from "../store/ducks/tweets/selectors";

export interface InfiniteScrollProps {
    page: number;
    isScrolled: boolean;
    setPage: (value: number | ((prevVar: number) => number)) => void;
    setIsScrolled: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const withInfiniteScroll = <T extends object>(Component: React.ComponentType<InfiniteScrollProps>) => () => {
    const pagesCount = useSelector(selectPagesCount);
    const [page, setPage] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return () => {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, [isScrolled]);

    const scrollHandler = (event: any): void => {
        const scrollHeight = event.target.documentElement.scrollHeight;
        const scrollTop = event.target.documentElement.scrollTop;
        const innerHeight = window.innerHeight + 500;

        if ((scrollHeight - (scrollTop + innerHeight) < 100) && (page < pagesCount)) {
            setIsScrolled(true);
        }
    };

    return (
        <Component
            page={page}
            isScrolled={isScrolled}
            setPage={setPage}
            setIsScrolled={setIsScrolled}
        />
    );
};
