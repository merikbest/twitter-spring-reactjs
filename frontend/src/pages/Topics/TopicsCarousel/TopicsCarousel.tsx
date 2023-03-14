import React, { FC, ReactElement, ReactNode } from "react";
import Carousel from "react-material-ui-carousel";

import { ArrowIcon, ArrowNextIcon } from "../../../icons";

interface TopicsCarouselProps {
    children: ReactNode;
}

const TopicsCarousel: FC<TopicsCarouselProps> = ({ children }): ReactElement => {
    return (
        <Carousel
            NextIcon={ArrowNextIcon}
            PrevIcon={ArrowIcon}
            indicators={false}
            autoPlay={false}
            swipe={false}
            duration={0}
        >
            {children}
        </Carousel>
    );
};

export default TopicsCarousel;
