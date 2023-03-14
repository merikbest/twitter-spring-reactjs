import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import EmptyNotifications from "../EmptyNotifications";
import { LoadingStatus } from "../../../../types/common";

describe("EmptyNotifications", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render empty Notification message", () => {
        const wrapper = mountWithStore(<EmptyNotifications isNotification={true} />, mockStore);
        expect(wrapper.text().includes("Nothing to see here — yet")).toBe(true);
        expect(wrapper.text().includes("From like to Retweets and whole lot more, this is where all the actions happens.")).toBe(true);
    });

    it("should render empty Mentions message", () => {
        const wrapper = mountWithStore(<EmptyNotifications isNotification={false} />, mockStore);
        expect(wrapper.text().includes("Nothing to see here — yet")).toBe(true);
        expect(wrapper.text().includes("When someone mentions you, you’ll find it here.")).toBe(true);
    });
});
