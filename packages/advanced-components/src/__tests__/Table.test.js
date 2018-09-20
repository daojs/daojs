import { mount } from 'enzyme';
import React from 'react';
import _ from 'lodash';
import Table from '../components/Table';

let table;
let initialWrapper;
const cells = _.times(9, _.constant(jest.fn()));
describe('Table', () => {
  beforeAll(() => {
    table = mount(<Table col={3} cells={cells} />);
    initialWrapper = table;
  });
  it('shoule be no throwerror', () => {
    expect(() => { mount(<Table col={3} cells={cells} />); }).not.toThrow();
  });
  describe('when initially', () => {
    it('length of cells should be correct', () => {
      expect(table.instance().props.cells.length).toBe(9);
    });
    it('col should be correct', () => {
      expect(table.instance().props.col).toBe(3);
    });
    it('state should be initalized correctly', () => {
      expect(table.state('allState')).toBe(true);
      expect(table.state('width')).toBe(24 / 3);
      expect(_.countBy(table.state('isExpanded'), Boolean).false).toBe(9);
    });
    describe('when render', () => {
      it('component should have nine Icons and nine Cols', () => {
        expect(table.find('Icon').length).toBe(9);
        expect(table.find('Col').length).toBe(9);
      });
      it('component should have one Row', () => {
        expect(table.find('Row').length).toBe(1);
      });
    });
  });

  describe('when first click one Icon', () => {
    let preIsExpanded;
    let preAllState;
    let id;
    beforeAll(() => {
      preAllState = table.state('allState');
      id = Math.floor(Math.random() * 9);
      preIsExpanded = table.state('isExpanded')[id];
      table.find('Icon').at(id).simulate('click');
    });
    it('should reverse the allState', () => {
      expect(table.state('allState')).toBe(!preAllState);
    });
    it('width should be 24', () => {
      expect(table.state('width')).toBe(24);
    });
    it('should reverse the isExpanded', () => {
      expect(table.state('isExpanded')[id]).toBe(!preIsExpanded);
      expect(_.countBy(table.state('isExpanded'), Boolean).true).toBe(1);
    });
    it('should have one Col', () => {
      expect(table.find('Col').length).toBe(1);
    });
    it('should expanded with correct id', () => {
      expect(table.state('isExpanded')[id]).toBe(true);
      const element = table.find('Col').get(0);
      expect(_.toNumber(element.key)).toBe(id);
    });
  });
  describe('when second click Icon', () => {
    beforeAll(() => {
      table.find('Icon').simulate('click');
    });
    it('should be the same as initial wrapper', () => {
      expect(table).toBe(initialWrapper);
    });
  });
});
