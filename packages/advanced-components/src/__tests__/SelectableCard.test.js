import { mount } from 'enzyme';
import React from 'react';
import SelectableCard from '../components/SelectableCard';

let wrapper;
const selector0 = {
  selectorType: 'singleTab',
  selectorLabel: 'dimension',
  options: ['age', 'gender', 'branchName'],
  defaultValue: ['age'],
};
const selector1 = {
  selectorType: 'multiTab',
  selectorLabel: 'balance',
  options: ['ave', 'max', 'min', 'num', 'sum'],
  defaultValue: ['ave', 'max'],
};
const contentMock = jest.fn();
describe('SelectableCard', () => {
  describe('in case of singleselector', () => {
    beforeAll(() => {
      wrapper = mount(<SelectableCard renderContent={contentMock} {...selector0} />);
    });
    it('should be no throwerror', () => {
      expect(() => {
        mount(<SelectableCard renderContent={contentMock} {...selector0} />);
      }).not.toThrow();
    });
    describe('when initially', () => {
      it('props should be correct', () => {
        const props = {
          renderContent: contentMock,
          ...selector0,
        };
        expect(wrapper.instance().props).toEqual(props);
      });
      it('value of state should be the same as defaultValue of props', () => {
        expect(wrapper.state('value')).toBe(wrapper.instance().props.defaultValue);
      });
      it('component should contain RadioGroup', () => {
        expect(wrapper.find('RadioGroup').length).toBeGreaterThanOrEqual(1);
      });
    });
    describe('when select', () => {
      it('should call update function', () => {
        const spy = jest.spyOn(SelectableCard.prototype, 'update');
        wrapper = mount(<SelectableCard renderContent={contentMock} {...selector0} />);
        wrapper.find('RadioGroup').at(1).props().onChange({ target: { value: 'gender' } });
        expect(spy).toHaveBeenCalled();
        expect(wrapper.state('value')).toBe('gender');
      });
    });
  });
  describe('test multiselector', () => {
    beforeAll(() => {
      wrapper = mount(<SelectableCard renderContent={contentMock} {...selector1} />);
    });
    it('should be no throwerror', () => {
      expect(() => {
        mount(<SelectableCard renderContent={contentMock} {...selector1} />);
      }).not.toThrow();
    });
    describe('when initially', () => {
      it('props should be correct', () => {
        const props = {
          renderContent: contentMock,
          ...selector1,
        };
        expect(wrapper.instance().props).toEqual(props);
      });
      it('value of state should be the same as defaultValue of props', () => {
        expect(wrapper.state('value')).toBe(wrapper.instance().props.defaultValue);
      });
    });
    describe('when select', () => {
      it('should call update function', () => {
        const spy = jest.spyOn(SelectableCard.prototype, 'update');
        wrapper = mount(<SelectableCard renderContent={contentMock} {...selector1} />);
        wrapper.find('Select').at(0).props().onChange(['ave', 'min']);
        expect(spy).toHaveBeenCalled();
        expect(wrapper.state('value')).toEqual(['ave', 'min']);
      });
    });
  });
});
