import React, {FC, ReactElement} from "react";
import {Link} from "react-router-dom";
import {IconButton} from "@material-ui/core";

import {useActionIconStyles} from "./ActionIconStyles";
import {MessagesAction, useMessageHoverAction} from "./useMessageHoverAction";
import HoverAction from "../../../components/HoverAction/HoverAction";

interface ActionIconProps {
    path?: string;
    onClick?: () => void;
    messageAction: MessagesAction;
    actionText: string;
    visibleAction: "visibleSettingsAction" | "visibleMediaAction" | "visibleGIFAction" | "visibleEmojiAction"
        | "visibleSendAction" | "visibleNewMessageAction" | "visibleDetailsAction";
    className: "icon" | "chatIcon" | "emojiIcon";
    icon: JSX.Element;
    positionTop?: boolean;
    disabled?: boolean
}

const ActionIcon: FC<ActionIconProps> = (
    {
        path,
        onClick,
        messageAction,
        actionText,
        visibleAction,
        className,
        icon,
        positionTop,
        disabled,
    }
): ReactElement => {
    const classes = useActionIconStyles();
    const {visibleHoverAction, handleHoverAction, handleLeaveAction} = useMessageHoverAction();

    const onClickIconButton = (): void => {
        if (onClick) {
            onClick();
            handleLeaveAction();
        }
    };

    const Icon = (): JSX.Element => {
        return (
            <IconButton
                onClick={onClickIconButton}
                onMouseEnter={() => handleHoverAction(messageAction)}
                onMouseLeave={handleLeaveAction}
                color="primary"
                disabled={disabled}
            >
                <>{icon}</>
                <HoverAction
                    visible={visibleHoverAction[visibleAction]}
                    actionText={actionText}
                    positionTop={positionTop}
                />
            </IconButton>
        );
    };

    return (
        <div className={classes[className]}>
            {path ? (
                <Link to={path}>
                    <Icon/>
                </Link>
            ) : (
                <Icon/>
            )}
        </div>
    );
};

export default ActionIcon;
