import React from "react";
import { createMemoryHistory } from "history";
import ReactRouter from "react-router";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { QUOTES } from "../../../../../constants/path-constants";
import QuotesCount from "../QuotesCount";

describe("QuotesCount", () => {
    it("should render correctly", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "9" });
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<QuotesCount />, createMockRootState(LoadingStatus.SUCCESS), history);
        wrapper.find("span").at(0).simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${QUOTES}/9`);
    });
});
