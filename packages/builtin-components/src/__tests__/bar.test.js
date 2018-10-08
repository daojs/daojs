import { mount } from 'enzyme';
import React from 'react';
import Bar from '../components/bar';
import fakeDate from '../../demo/demo/fakeData.demo';

let bar;
describe('Bar', () => {
  describe('when isHorizontal is false', () => {
    beforeAll(() => {
      bar = mount(<Bar
        source={fakeDate.timeStampData}
        isHorizontal={false}
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />);
    });
    it('should be no throwerror', () => {
      expect(() => mount(<Bar
        source={fakeDate.timeStampData}
        isHorizontal={false}
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />)).not.toThrow();
    });
    describe('when initially', () => {
      it('props should be correct', () => {
        const props = {
          source: fakeDate.timeStampData,
          isHorizontal: false,
          axisDimensions: ['timestamp'],
          metricDimensions: ['value1', 'value2', 'value3', 'value4'],
        };
        bar = mount(<Bar
          source={fakeDate.timeStampData}
          isHorizontal={false}
          axisDimensions={['timestamp']}
          metricDimensions={['value1', 'value2', 'value3', 'value4']}
        />);
        expect(bar.props()).toEqual(props);
      });
      it('component should contain EchartsReact', () => {
        expect(bar.find('EchartsReact').length).toBe(1);
      });
    });
    describe('when give parameter to echart', () => {
      it('source should be correct', () => {
        expect(bar.find('EchartsReact').get(0).props.source).toEqual(fakeDate.timeStampData);
      });
      it('isHorizontal should be false', () => {
        expect(bar.find('EchartsReact').get(0).props.isHorizontal).toBeFalsy();
      });
      it('axisDimensions should be correct', () => {
        expect(bar.find('EchartsReact').get(0).props.axisDimensions).toEqual(['timestamp']);
      });
      it('metricDimensions should be correct', () => {
        expect(bar.find('EchartsReact').get(0).props.metricDimensions).toEqual(['value1', 'value2', 'value3', 'value4']);
      });
    });
  });
  describe('when isHorizontal is true', () => {
    beforeAll(() => {
      bar = mount(<Bar
        source={fakeDate.timeStampData}
        isHorizontal
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />);
    });
    it('should be no throwerror', () => {
      expect(() => mount(<Bar
        source={fakeDate.timeStampData}
        isHorizontal
        axisDimensions={['timestamp']}
        metricDimensions={['value1', 'value2', 'value3', 'value4']}
      />)).not.toThrow();
    });
    describe('when initially', () => {
      it('props should be correct', () => {
        const props = {
          source: fakeDate.timeStampData,
          isHorizontal: true,
          axisDimensions: ['timestamp'],
          metricDimensions: ['value1', 'value2', 'value3', 'value4'],
        };
        bar = mount(<Bar
          source={fakeDate.timeStampData}
          isHorizontal
          axisDimensions={['timestamp']}
          metricDimensions={['value1', 'value2', 'value3', 'value4']}
        />);
        expect(bar.props()).toEqual(props);
      });
      it('component should contain EchartsReact', () => {
        expect(bar.find('EchartsReact').length).toBe(1);
      });
    });
    describe('when give parameter to echart', () => {
      it('source should be correct', () => {
        expect(bar.find('EchartsReact').get(0).props.source).toEqual(fakeDate.timeStampData);
      });
      it('isHorizontal should be false', () => {
        expect(bar.find('EchartsReact').get(0).props.isHorizontal).toBeTruthy();
      });
      it('axisDimensions should be correct', () => {
        expect(bar.find('EchartsReact').get(0).props.axisDimensions).toEqual(['timestamp']);
      });
      it('metricDimensions should be correct', () => {
        expect(bar.find('EchartsReact').get(0).props.metricDimensions).toEqual(['value1', 'value2', 'value3', 'value4']);
      });
    });
  });
});
