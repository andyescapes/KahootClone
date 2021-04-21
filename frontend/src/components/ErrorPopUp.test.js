import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { Backdrop } from "@material-ui/core";
import ErrorPopUp from "./ErrorPopUp";
import Modal from "@material-ui/core/Modal";
import { createMount } from "@material-ui/core/test-utils";
import { act } from "react-dom/test-utils";

describe("ErrorPopUp", () => {
  const noop = () => {};

  it("contains a p", () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find("p").length).toBe(1);
  });

  it("contains a h2", () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find("h2").length).toBe(1);
  });

  it("contains a Material ui Modal", () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it("contains the title supplied via props", () => {
    const wrapper = shallow(<ErrorPopUp title={"hello"} />);
    expect(wrapper.find("h2").text()).toBe("hello");
  });

  it("contains the correct error supplied via props", () => {
    const wrapper = shallow(<ErrorPopUp error={"test"} />);
    expect(wrapper.find("p").text()).toBe("test");
  });

  it("contains the default title being error if no props supplied", () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find("h2").text()).toBe("Error");
  });

  // it("vlick", () => {
  //   const deleteFn = jest.fn();
  //   const event = {
  //     stopPropagation: () => {
  //       console.log("test");
  //     },
  //   };
  //   const wrapper = shallow(<ErrorPopUp setError={deleteFn} />);
  //   wrapper.find(Modal).onClose();
  //   expect(deleteFn).toHaveBeenCalledTimes(1);
  // });

  // it("renders with minimal props", () => {
  //   const errorPopUp = renderer.create(<ErrorPopUp setState={noop} />).toJSON();
  //   expect(errorPopUp).toMatchSnapshot();
  // });

  // it("renders with with provided label (snapshot)", () => {
  //   const errorPopUp = renderer
  //     .create(<ErrorPopUp setState={noop} title={"a title"} />)
  //     .toJSON();
  //   expect(errorPopUp).toMatchSnapshot();
  // });

  // it("renders with with provided value (snapshot)", () => {
  //   const errorPopUp = renderer
  //     .create(<ErrorPopUp setState={noop} error={"my error"} />)
  //     .toJSON();
  //   expect(errorPopUp).toMatchSnapshot();
  // });

  // it("correctly displays the correct value", () => {
  //   const wrapper = shallow(<ErrorPopUp state={"hello"} label={"test"} />);
  //   // expect(wrapper.text()).to.equal("test");
  //   console.log(wrapper.find(TextField).debug());
  //   expect(wrapper.find(TextField).props()).value.to.equal("hello");
  // });
});
