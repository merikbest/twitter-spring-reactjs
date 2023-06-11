import React from "react";
import routeData from "react-router";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import AddTweetImage from "../AddTweetImage";
import { ImageObj } from "../../AddTweetForm";
import { MODAL } from "../../../../constants/path-constants";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import { AddTweetFormTypes } from "../../../../store/ducks/addTweetForm/constants/actionTypes";

describe("AddTweetImage", () => {
    const mockImages = [{ src: "test", file: new File([""], "filename", { type: "text/html" }) }] as ImageObj[];
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockRootState = { ...mockStore, addTweetForm: { ...mockStore.addTweetForm, images: mockImages } };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render default image", () => {
        const wrapper = mountWithStore(<AddTweetImage />, mockRootState);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockImages[0].src);
    });

    it("should on click remove image", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MODAL, hash: "", search: "", state: undefined
        });
        const wrapper = mountWithStore(<AddTweetImage />, mockRootState);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: AddTweetFormTypes.REMOVE_IMAGES });
    });

    it("should render empty component", () => {
        const wrapper = mountWithStore(<AddTweetImage />, mockStore);
        expect(wrapper.find(ActionIconButton).exists()).toBeFalsy();
    });
});
