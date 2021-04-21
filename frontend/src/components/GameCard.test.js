import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import GameCard from "./GameCard";
import SessionModal from "./SessionModal";
import ErrorPopUp from "./ErrorPopUp";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

describe("GameCard", () => {
  const noop = () => {};

  it("contains a svg", () => {
    const wrapper = shallow(<GameCard />);
    expect(wrapper.find("svg").length).toBe(1);
  });

  it("contains a Material UI Typography", () => {
    const wrapper = shallow(<GameCard />);
    expect(wrapper.find(Typography).length).toBe(2);
  });

  it("contains a Material UI Card", () => {
    const wrapper = shallow(<GameCard />);
    expect(wrapper.find(Card).length).toBe(1);
  });

  it("contains no buttons if no dashboard prop supplied", () => {
    const wrapper = shallow(<GameCard />);
    expect(wrapper.find(Button).length).toBe(0);
  });

  it("contains a Material UI Button when dashboard prop supplied", () => {
    const wrapper = shallow(<GameCard dashboard={true} />);
    expect(wrapper.find(Button).length).toBe(4);
  });

  it("contains start game Button when dashboard prop supplied", () => {
    const wrapper = shallow(<GameCard dashboard={true} />);
    expect(wrapper.find(Button).at(0).text()).toBe("Start Game");
  });

  it("contains a stop game UI Button when dashboard prop supplied", () => {
    const wrapper = shallow(<GameCard dashboard={true} />);
    expect(wrapper.find(Button).at(1).text()).toBe("Stop Game");
  });

  it("contains an advance question Button when dashboard prop supplied", () => {
    const wrapper = shallow(<GameCard dashboard={true} />);
    expect(wrapper.find(Button).at(2).text()).toBe("Advance Question");
  });

  it("contains a last results Button when dashboard prop supplied", () => {
    const wrapper = shallow(<GameCard dashboard={true} />);
    expect(wrapper.find(Button).at(3).text()).toBe("Last Results");
  });

  it("triggers onClick event handler which calls a function", () => {
    const deleteFn = jest.fn();
    const event = {
      stopPropagation: () => {
        console.log("test");
      },
    };

    const wrapper = shallow(<GameCard dashboard={true} delete={deleteFn} />);
    wrapper.find("svg").simulate("click", event);
    expect(deleteFn).toHaveBeenCalledTimes(1);
  });

  it("contains the title supplied via props", () => {
    const wrapper = shallow(<GameCard title={"hello"} />);
    expect(wrapper.find(Typography).at(0).text()).toBe("hello");
  });

  it("by default contains no SessionModal", () => {
    const wrapper = shallow(<GameCard title={"hello"} />);
    expect(wrapper.find(SessionModal).length).toBe(0);
  });

  it("by default contains no ErorPopUp", () => {
    const wrapper = shallow(<GameCard title={"hello"} />);
    expect(wrapper.find(ErrorPopUp).length).toBe(0);
  });

  it("renders with minimal props", () => {
    const gameCard = renderer.create(<GameCard setState={noop} />).toJSON();
    expect(gameCard).toMatchSnapshot();
  });

  it("renders with provided details (snapshot)", () => {
    const gameCard = renderer
      .create(<GameCard delete={noop} details={"a detail"} />)
      .toJSON();
    expect(gameCard).toMatchSnapshot();
  });

  it("renders with additional buttons when dashboard prop active (snapshot)", () => {
    const gameCard = renderer
      .create(<GameCard delete={noop} details={"a detail"} dashboard={true} />)
      .toJSON();
    expect(gameCard).toMatchSnapshot();
  });
});
