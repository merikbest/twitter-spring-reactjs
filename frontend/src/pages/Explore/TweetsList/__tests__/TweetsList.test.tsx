import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import Spinner from "../../../../components/Spinner/Spinner";
import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import TweetsList from "../TweetsList";

describe("TweetsList", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<TweetsList />, createMockRootState());
        expect(wrapper.find(TweetComponent).length).toEqual(2);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });
});
