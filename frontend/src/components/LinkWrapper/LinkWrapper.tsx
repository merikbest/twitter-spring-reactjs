import React, { FC, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import { useGlobalStyles } from "../../util/globalClasses";

interface LinkWrapperProps {
    children: ReactNode;
    path: string;
    visiblePopperWindow?: boolean;
}

const LinkWrapper: FC<LinkWrapperProps> = ({ children, path, visiblePopperWindow }): ReactElement => {
    const globalClasses = useGlobalStyles({});

    if (visiblePopperWindow) {
        return <span>{children}</span>;
    } else {
        return (
            <Link to={path} className={globalClasses.link}>
                {children}
            </Link>
        );
    }
};

export default LinkWrapper;
