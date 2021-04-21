import { shallow } from 'enzyme';
import React from 'react';
import ErrorPopUp from './ErrorPopUp';
import Modal from '@material-ui/core/Modal';

describe('ErrorPopUp', () => {
  it('contains a p', () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find('p').length).toBe(1);
  });

  it('contains a h2', () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find('h2').length).toBe(1);
  });

  it('contains a Material ui Modal', () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it('contains the title supplied via props', () => {
    const wrapper = shallow(<ErrorPopUp title={'hello'} />);
    expect(wrapper.find('h2').text()).toBe('hello');
  });

  it('contains the correct error supplied via props', () => {
    const wrapper = shallow(<ErrorPopUp error={'test'} />);
    expect(wrapper.find('p').text()).toBe('test');
  });

  it('contains the default title being error if no props supplied', () => {
    const wrapper = shallow(<ErrorPopUp />);
    expect(wrapper.find('h2').text()).toBe('Error');
  });
});
