import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { useActionIconStyles } from "./ActionIconStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";

interface ActionIconProps {
    path?: string;
    onClick?: () => void;
    actionText: string;
    className: "icon" | "chatIcon" | "emojiIcon";
    icon: JSX.Element;
    positionTop?: boolean;
    disabled?: boolean;
}

const ActionIcon: FC<ActionIconProps> = (
    {
        path,
        onClick,
        actionText,
        className,
        icon,
        disabled
    }
): ReactElement => {
    const classes = useActionIconStyles();

    const Icon = (): JSX.Element => {
        return <ActionIconButton
            onClick={onClick}
            actionText={actionText}
            disabled={disabled}
            icon={icon}
            size={"medium"}
        />;
    };

    return (
        <div className={classes[className]}>
            {path ? (
                <Link to={path}>
                    <Icon />
                </Link>
            ) : (
                <Icon />
            )}
        </div>
    );
};

export default ActionIcon;
