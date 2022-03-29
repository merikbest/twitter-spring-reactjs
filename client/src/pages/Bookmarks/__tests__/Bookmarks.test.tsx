import {render} from "@testing-library/react";
import {mockBookmarks} from "./mockBookmarks";
import Bookmarks from "../Bookmarks";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import App from "../../../App";
import {createMockRootState} from "../../../util/testHelper";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useLocation: () => ({
//         pathname: "localhost:3000/bookmarks"
//     })
// }));

describe("Bookmarks", () => {
    const mockStore = configureStore();
    const history = createMemoryHistory();

    it("should render correctly", () => {
        const wrapper = shallow(<Bookmarks />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
