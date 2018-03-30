// import Promise from 'bluebird';
import _ from 'lodash';
import client from '../../mock/worker';

// dags
import factories from '../../factories';
import branch from '../branch.json';
import category from '../category.json';

const {
  fetchMasterKongRevenueBreakDownByTime,
  fetchMasterKongRevenueGap,
  fetchMasterKongVolumeBreakDown,
  fetchSalesLastYear,
} = factories;

const simulation = client.call('masterKongSimulate');

export default {
  parameters: {
    branch: { default: undefined },
    category: { default: '冰茶' },
  },
  cells: {
    branch: {
      factory: () => Promise.resolve({
        defaultValue: '江西',
        enums: branch,
      }),
    },
    category: {
      factory: () => Promise.resolve({
        defaultValue: '冰茶',
        enums: category,
      }),
    },
    fetchRevenueGapPerCategory: {
      dependencies: ['@branch'],
      factory: fetchMasterKongRevenueGap(client, simulation, {
        metric: 'branch',
        otherMetric: 'category',
      }),
    },
    revenueGapPerCategory: {
      dependencies: ['fetchRevenueGapPerCategory'],
      factory: (rawData) => {
        if (_.some([rawData], _.isNil)) {
          return undefined;
        }

        return Promise.resolve({
          source: _.map(rawData, item => [item.category, item.month, item['销售指标差距']]),
          metricDimensions: ['销售指标差距'],
        });
      },
    },
    fetchRevenueGapPerBranch: {
      dependencies: ['@category'],
      factory: fetchMasterKongRevenueGap(client, simulation, {
        metric: 'category',
        otherMetric: 'branch',
      }),
    },
    revenueGapPerBranch: {
      dependencies: ['fetchRevenueGapPerBranch'],
      factory: (rawData) => {
        if (_.some([rawData], _.isNil)) {
          return undefined;
        }

        return Promise.resolve({
          source: _.map(rawData, item => [item.branch, item.month, item['销售指标差距']]),
          metricDimensions: ['销售指标差距'],
        });
      },
    },
    fetchRevenueBreakDownByCategory: {
      dependencies: ['@category'],
      factory: fetchMasterKongRevenueBreakDownByTime(client, simulation, 'category'),
    },
    revenueBreakDownByCategory: {
      dependencies: ['fetchRevenueBreakDownByCategory'],
      factory: data => ({
        source: data,
      }),
    },
    fetchRevenueBreakDownByBranch: {
      dependencies: ['@branch'],
      factory: fetchMasterKongRevenueBreakDownByTime(client, simulation, 'branch'),
    },
    revenueBreakDownByBranch: {
      dependencies: ['fetchRevenueBreakDownByBranch'],
      factory: data => ({
        source: data,
      }),
    },
    fetchVolumeBreakDownByCategory: {
      dependencies: ['@category'],
      factory: fetchMasterKongVolumeBreakDown(client, simulation, 'category'),
    },
    volumeBreakDownByCategory: {
      dependencies: ['fetchVolumeBreakDownByCategory'],
      factory: data => ({
        source: data,
      }),
    },
    fetchvolumeBreakDownByBranch: {
      dependencies: ['@branch'],
      factory: fetchMasterKongVolumeBreakDown(client, simulation, 'branch'),
    },
    volumeBreakDownByBranch: {
      dependencies: ['fetchvolumeBreakDownByBranch'],
      factory: data => ({
        source: data,
      }),
    },
    fetchSalesLastYear: {
      factory: fetchSalesLastYear(),
    },
    salesLastYear: {
      factory: (response) => {
        const data = _.map(_.range(365), i => ({
          time: i,
          sales: _.random(100, 500),
          predicate: _.random(100, 500),
        }));
        return {
          source: data,
          axisDimensions: ['time'],
          key2name: {
            sales: '销售量',
            predicate: '预测值',
          },
          markArea: [
            [
              {
                name: '第一次活动',
                xAxis: 10,
              },
              {
                xAxis: 20,
              },
            ],
          ],
        };
      },
    },
  },
  id: '20002',
};
