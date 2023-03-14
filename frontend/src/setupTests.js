import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });

window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
});
