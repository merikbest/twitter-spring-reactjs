import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActionIconStyles } from "./ActionIconStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";

interface ActionIconProps {
    path?: string;
    onClick?: () => void;
    actionText: string;
    translationKey: string;
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
        translationKey,
        className,
        icon,
        disabled
    }
): ReactElement => {
    const classes = useActionIconStyles();
    const { t } = useTranslation();

    const Icon = (): JSX.Element => {
        return <ActionIconButton
            onClick={onClick}
            actionText={t(translationKey, { defaultValue: actionText })}
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
