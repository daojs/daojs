import { mount } from 'enzyme';
import React from 'react';
import Donut from '../components/donut';

const data = [{
  season: 'spring',
  value: 10,
}, {
  season: 'summer',
  value: 20,
}, {
  season: 'autumn',
  value: 40,
}, {
  season: 'winter',
  value: 80,
}];
let donut;
describe('donut', () => {
  describe('when hasLegend is true', () => {
    beforeAll(() => {
      donut = mount(<Donut title="Donut" subTitle="" source={data} />);
    });
    it('should be no throwerror', () => {
      expect(() => mount(<Donut title="Donut" subTitle="" source={data} />)).not.toThrow();
    });
    describe('when initially', () => {
      it('props should be correct', () => {
        const props = {
          title: 'Donut',
          subTitle: '',
          source: data,
          hasLegend: true,
        };
        expect(donut.props()).toEqual(props);
      });
      it('component should contain EchartsReact', () => {
        expect(donut.find('EchartsReact').length).toBe(1);
      });
    });
    describe('when give parameter to echart', () => {
      it('title should be "Donut"', () => {
        expect(donut.find('EchartsReact').get(0).props.title).toBe('Donut');
      });
      it('subTitle should be null string', () => {
        expect(donut.find('EchartsReact').get(0).props.subTitle).toBe('');
      });
      it('source should be correct', () => {
        expect(donut.find('EchartsReact').get(0).props.source).toEqual(data);
      });
      it('hasLegend should be true', () => {
        expect(donut.find('EchartsReact').get(0).props.hasLegend).toBeTruthy();
      });
    });
  });
  describe('when hasLegend is false', () => {
    beforeAll(() => {
      donut = mount(<Donut title="Donut" subTitle="abc" source={data} hasLegend={false} />);
    });
    it('should be no throwerror', () => {
      expect(() => mount(<Donut title="Donut" subTitle="abc" source={data} hasLegend={false} />)).not.toThrow();
    });
    describe('when initially', () => {
      it('props should be correct', () => {
        const props = {
          title: 'Donut',
          subTitle: 'abc',
          source: data,
          hasLegend: false,
        };
        expect(donut.props()).toEqual(props);
      });
      it('component should contain EchartsReact', () => {
        expect(donut.find('EchartsReact').length).toBe(1);
      });
    });
    describe('when give parameter to echart', () => {
      it('title should be "Donut"', () => {
        expect(donut.find('EchartsReact').get(0).props.title).toBe('Donut');
      });
      it('subTitle should be "abc"', () => {
        expect(donut.find('EchartsReact').get(0).props.subTitle).toBe('abc');
      });
      it('source should be correct', () => {
        expect(donut.find('EchartsReact').get(0).props.source).toEqual(data);
      });
      it('hasLegend should be true', () => {
        expect(donut.find('EchartsReact').get(0).props.hasLegend).toBeFalsy();
      });
    });
  });
});
