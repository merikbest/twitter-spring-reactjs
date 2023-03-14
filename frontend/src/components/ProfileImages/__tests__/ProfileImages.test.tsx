import React from "react";
import { Link } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ImageList, ImageListItem } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { MODAL } from "../../../constants/path-constants";
import ProfileImages from "../ProfileImages";
import { LoadingStatus } from "../../../types/common";

describe("ProfileImages", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);

    it("should render 2 images", () => {
        testImages(2);
    });

    it("should render 3 images", () => {
        testImages(3);
    });

    it("should render 4 images", () => {
        testImages(4);
    });

    it("should render 5 images", () => {
        testImages(5);
    });

    it("should render 6 images", () => {
        testImages(6);
    });

    it("should click Link and go to 1st image", () => {
        testClickLink(0);
    });

    it("should click Link and go to 2nd image", () => {
        testClickLink(1);
    });

    it("should click Link and go to 3rd image", () => {
        testClickLink(2);
    });

    it("should click Link and go to 4th image", () => {
        testClickLink(3);
    });

    it("should click Link and go to 5th image", () => {
        testClickLink(4);
    });

    it("should click Link and go to 6th image", () => {
        testClickLink(5);
    });

    it("should render empty Profile Images", () => {
        const mockImagesArray = createImagesArray(1);
        const wrapper = mountWithStore(<ProfileImages />, {
            ...mockState,
            userProfile: { ...mockState.userProfile, images: mockImagesArray }
        });

        expect(wrapper.find(ImageList).exists()).toBeFalsy();
    });

    const testClickLink = (imageIndex: number): void => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const mockImagesArray = createImagesArray(6);
        const wrapper = mountWithStore(<ProfileImages />, {
            ...mockState,
            userProfile: { ...mockState.userProfile, images: mockImagesArray }
        }, history);

        wrapper.find(Link).at(imageIndex).simulate("click", { button: 0 });

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({
            pathname: `${MODAL}/${mockImagesArray[imageIndex].tweetId}`,
            state: {
                background: { pathname: "/", hash: "", key: expect.any(String), search: "", state: undefined }
            }
        });
    };

    const testImages = (imagesLength: number): void => {
        const mockImagesArray = createImagesArray(imagesLength);
        const wrapper = mountWithStore(<ProfileImages />, {
            ...mockState,
            userProfile: { ...mockState.userProfile, images: mockImagesArray }
        });

        expect(wrapper.find(ImageList).prop("cols")).toBe((imagesLength <= 4) ? 2 : 3);
        expect(wrapper.find(ImageListItem).length).toEqual(imagesLength);
        for (let i = 0; i < imagesLength; i++) {
            expect(wrapper.find(ImageListItem).at(i).prop("cols")).toBe(
                (imagesLength === 3 && i === 2 || imagesLength === 5 && i === 4) ? 2 : 1);
            expect(wrapper.find(ImageListItem).at(i).prop("rows")).toBe((imagesLength === 2) ? 2 : 1);
            expect(wrapper.find("img").at(i).prop("src")).toBe(mockImagesArray[i].src);
        }
    };

    const createImagesArray = (arrayLength: number) => {
        const imagesArray = [];

        for (let i = 0; i < arrayLength; i++) {
            imagesArray.push({
                tweetId: 10 + i, imageId: 10 + i, src: `https://test${i}.test/test.jpg`
            });
        }
        return imagesArray;
    };
});
