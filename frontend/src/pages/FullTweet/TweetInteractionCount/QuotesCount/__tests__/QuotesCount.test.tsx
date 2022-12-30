import React from "react";
import {createMemoryHistory} from "history";
import ReactRouter from "react-router";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import {QUOTES} from "../../../../../util/pathConstants";
import QuotesCount from "../QuotesCount";

describe("QuotesCount", () => {
    it("should render correctly", () => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({id: "9"});
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<QuotesCount/>, createMockRootState(LoadingStatus.SUCCESS), history);
        wrapper.find("a").simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${QUOTES}/9`);
    });
});
