import React from "react";
import { Dialog } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import { mockFullList } from "../../../../../../util/test-utils/mock-test-data";
import TweetListComponent from "../../../../../../components/TweetListComponent/TweetListComponent";
import TweetListModal from "../TweetListModal";

describe("TweetListModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockState = { ...mockRootState, list: { ...mockRootState.list, list: mockFullList } };

    it("should visible TweetListModal", () => {
        testTweetListModal(true);
    });

    it("should render empty TweetListModal", () => {
        testTweetListModal(false);
    });

    const testTweetListModal = (visibleModalWindow: boolean): void => {
        const wrapper = mountWithStore(
            <TweetListModal
                visibleModalWindow={visibleModalWindow}
                onCloseModalWindow={jest.fn()}
            />, mockState);
        const isDialogExist = expect(wrapper.find(Dialog).exists());
        const isTweetListComponentExist = expect(wrapper.find(TweetListComponent).exists());

        if (visibleModalWindow) {
            isDialogExist.toBeTruthy();
            isTweetListComponentExist.toBeTruthy();
        } else {
            isDialogExist.toBeFalsy();
            isTweetListComponentExist.toBeFalsy();
        }
    };
});
