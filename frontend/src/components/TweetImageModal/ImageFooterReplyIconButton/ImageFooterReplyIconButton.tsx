import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import { selectRepliesCount } from "../../../store/ducks/tweet/selectors";
import { ReplyIcon } from "../../../icons";
import ImageFooterButton from "../ImageFooterButton/ImageFooterButton";

const ImageFooterReplyIconButton = memo((): ReactElement => {
    const repliesCount = useSelector(selectRepliesCount);

    return <ImageFooterButton id={"repliesCount"} icon={ReplyIcon} count={repliesCount ?? 0} />;
});

export default ImageFooterReplyIconButton;
