import { mount } from 'enzyme';
import React from 'react';
import StackBar from '../components/stack-bar';
import fakeData from '../../demo/demo/fakeData.demo';


let stackbar;
describe('stackbar', () => {
  beforeAll(() => {
    stackbar = mount(<StackBar
      source={fakeData.timeStampData}
      axisDimensions={['timestamp']}
      metricDimensions={['value1', 'value2', 'value3']}
    />);
  });
  it('should be no throwerror', () => {
    expect(() => mount(<StackBar
      source={fakeData.timeStampData}
      axisDimensions={['timestamp']}
      metricDimensions={['value1', 'value2', 'value3']}
    />)).not.toThrow();
  });
  describe('when initially', () => {
    it('props should be correct', () => {
      const props = {
        source: fakeData.timeStampData,
        axisDimensions: ['timestamp'],
        metricDimensions: ['value1', 'value2', 'value3'],
      };
      expect(stackbar.props()).toEqual(props);
    });
    it('component should contain EchartsReact', () => {
      expect(stackbar.find('EchartsReact').length).toBe(1);
    });
  });
  describe('when give parameter to echart', () => {
    it('source should be correct', () => {
      expect(stackbar.find('EchartsReact').get(0).props.source).toEqual(fakeData.timeStampData);
    });
    it('axisDimension should be correct', () => {
      expect(stackbar.find('EchartsReact').get(0).props.axisDimensions).toEqual(['timestamp']);
    });
    it('metricDimension should be correct', () => {
      expect(stackbar.find('EchartsReact').get(0).props.metricDimensions).toEqual(['value1', 'value2', 'value3']);
    });
  });
});
