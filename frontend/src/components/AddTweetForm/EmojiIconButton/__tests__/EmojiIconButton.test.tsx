import React from "react";
import { IconButton, Popover } from "@material-ui/core";
import { setImmediate } from "timers";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import EmojiIconButton from "../EmojiIconButton";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";

describe("EmojiIconButton", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should open/close Popover", (done) => {
        const wrapper = mountWithStore(<EmojiIconButton addEmoji={jest.fn()} />, mockStore);
        expect(wrapper.find(Popover).prop("open")).toBe(false);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(wrapper.find(Popover).prop("open")).toBe(true);
        // @ts-ignore
        wrapper.find(Popover).prop("onClose")(jest.fn());
        setImmediate(() => {
            wrapper.update();
            done();
            expect(wrapper.find(Popover).prop("open")).toBe(false);
        });
    });
});
