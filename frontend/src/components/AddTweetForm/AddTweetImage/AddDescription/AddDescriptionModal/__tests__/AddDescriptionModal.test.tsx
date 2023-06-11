import React from "react";
import { Button, Dialog } from "@material-ui/core";
import { setImmediate } from "timers";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../types/common";
import AddDescriptionModal from "../AddDescriptionModal";
import { AddTweetFormTypes } from "../../../../../../store/ducks/addTweetForm/constants/actionTypes";
import TweetInput from "../../../../../TweetInput/TweetInput";
import { ImageObj } from "../../../../AddTweetForm";

describe("AddDescriptionModal", () => {
    const mockImages = [{ src: "test", file: new File([""], "filename", { type: "text/html" }) }] as ImageObj[];
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockRootState = { ...mockStore, addTweetForm: { ...mockStore.addTweetForm, images: mockImages } };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click onSubmit", (done) => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<AddDescriptionModal visible={true} onClose={mockOnClose} />, mockRootState);
        wrapper.find(TweetInput).at(0).find("textarea").simulate("change", { target: { value: "test" } });
        wrapper.find(Button).at(0).simulate("submit");
        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockOnClose).toHaveBeenCalled();
            expect(mockDispatchFn).nthCalledWith(1, { payload: "test", type: AddTweetFormTypes.SET_IMAGE_DESCRIPTION });
        });
    });

    it("should render empty AddDescriptionModal", () => {
        const wrapper = mountWithStore(<AddDescriptionModal visible={false} onClose={jest.fn()} />, mockRootState);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
