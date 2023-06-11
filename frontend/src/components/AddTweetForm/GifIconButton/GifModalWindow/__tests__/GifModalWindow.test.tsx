import React from "react";
import { Dialog, IconButton, ImageListItem } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import GifModalWindow from "../GifModalWindow";
import GifTopics from "../GifTopics/GifTopics";
import { AddTweetFormTypes } from "../../../../../store/ducks/addTweetForm/constants/actionTypes";
import CloseButton from "../../../../CloseButton/CloseButton";
import { MainSearchTextField } from "../../../../SearchTextField/MainSearchTextField";
import GifList from "../GifList/GifList";
import Spinner from "../../../../Spinner/Spinner";
import { mockGiphyData } from "../../../../../util/test-utils/mock-test-data";

describe("GifModalWindow", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render correctly", () => {
        const wrapper = mountWithStore(<GifModalWindow onClose={jest.fn()} visible />, mockRootState);
        expect(wrapper.find(GifTopics).exists()).toBeTruthy();
    });

    it("should on click gif topic", () => {
        const wrapper = mountWithStore(<GifModalWindow onClose={jest.fn()} visible />, mockRootState);
        wrapper.find(GifTopics).find(ImageListItem).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: [],
            type: AddTweetFormTypes.SET_GIFS
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: LoadingStatus.LOADING,
            type: AddTweetFormTypes.SET_LOADING_STATE
        });
    });

    it("should search gif", () => {
        const wrapper = mountWithStore(<GifModalWindow onClose={jest.fn()} visible />, mockRootState);
        wrapper.find(MainSearchTextField).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        expect(wrapper.find(MainSearchTextField).prop("value")).toBe("test_value");
        expect(wrapper.find(GifList).exists()).toBeTruthy();
    });

    it("should render Spinner", () => {
        const wrapper = mountWithStore(<GifModalWindow onClose={jest.fn()}
                                                       visible />, createMockRootState(LoadingStatus.LOADING));
        wrapper.find(MainSearchTextField).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should on click gif", () => {
        const mockRootState = createMockRootState(LoadingStatus.LOADED);
        const mockState = { ...mockRootState, addTweetForm: { ...mockRootState.addTweetForm, gifs: mockGiphyData } };
        const wrapper = mountWithStore(<GifModalWindow onClose={jest.fn()} visible />, mockState);
        wrapper.find(MainSearchTextField).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        expect(wrapper.find(ImageListItem).length).toEqual(2);
        wrapper.find(GifList).find(ImageListItem).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: mockGiphyData[0],
            type: AddTweetFormTypes.SET_GIF
        });
        expect(mockDispatchFn).nthCalledWith(2, { type: AddTweetFormTypes.RESET_GIFS });
    });

    it("should on close modal window", () => {
        const wrapper = mountWithStore(<GifModalWindow onClose={jest.fn()} visible />, mockRootState);
        wrapper.find(CloseButton).find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: AddTweetFormTypes.RESET_GIFS });
    });

    it("should render empty GifModalWindow", () => {
        const wrapper = mountWithStore(<GifModalWindow onClose={jest.fn()} visible={false} />, mockRootState);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
