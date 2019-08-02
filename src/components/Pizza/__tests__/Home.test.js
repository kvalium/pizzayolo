import Home from "../Home";

import React from "react";
import { shallow } from "enzyme";
// import renderer from "react-test-renderer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("triggers method on click", () => {
  const myMock = jest.fn();
  const component = shallow(<Home onClick={myMock} />);
  component.find("button").simulate("click");
  expect(myMock).toHaveBeenCalledTimes(1);
});
