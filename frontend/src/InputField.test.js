import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import InputField from './components/InputField';
import TextField from '@material-ui/core/TextField';

describe('InputField', () => {
  const noop = () => {};

  it('contains a Material UI Textfield', () => {
    const wrapper = shallow(<InputField />);
    expect(wrapper.find(TextField).length).toBe(1);
    console.log(wrapper.find(TextField));
  });

  it('TextField contains the value supplied via props', () => {
    const wrapper = shallow(<InputField state={'hello'} />);
    expect(wrapper.find(TextField).prop('value')).toBe('hello');
    console.log(wrapper.find(TextField));
  });
  it('TextField contains the correct label supplied via props', () => {
    const wrapper = shallow(<InputField field={'test'} />);
    expect(wrapper.find(TextField).prop('label')).toBe('test');
    console.log(wrapper.find(TextField));
  });

  it('triggers onChange event handler which calls setState when value changed', () => {
    const setState = jest.fn();

    const event = {
      target: {
        value: 'test value',
      },
    };
    const wrapper = shallow(<InputField setState={setState} />);
    wrapper.find(TextField).at(0).simulate('change', event);
    expect(setState).toHaveBeenCalledTimes(1);
  });

  it('renders with minimal props', () => {
    const textField = renderer.create(<TextField setState={noop} />).toJSON();
    expect(textField).toMatchSnapshot();
  });

  it('renders with with provided label (snapshot)', () => {
    const textField = renderer
      .create(<TextField setState={noop} field={'a title'} />)
      .toJSON();
    expect(textField).toMatchSnapshot();
  });
  it('renders with with provided value (snapshot)', () => {
    const textField = renderer
      .create(<TextField setState={noop} state={'my value'} />)
      .toJSON();
    expect(textField).toMatchSnapshot();
  });
});
