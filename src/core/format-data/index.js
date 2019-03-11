// @flow

type Params = { state: Object, data: Object };

const getMaxValue = column => column.reduce((result, value) => (
  typeof value === 'number' && result < value
    ? value
    : result
), 0);

const checkStatusLine = (state, id) => {
  const { statusLine } = state.getValue();

  return statusLine[id] === undefined ||
    statusLine[id] === true;
};

const isLine = (data, id) => {
  const { types } = data;

  return types[id] === 'line';
};

const getMaxValues = (params: Params) => {
  const { state, data } = params;
  const { columns, types } = data;

  return columns.reduce((result, column) => {
    const id = column[0];

    if (isLine(data, id) && checkStatusLine(state, id)) {
      result[id] = getMaxValue(column);
    }

    return result;
  }, {});
};

const getMaxValueLines = (params: Params) => {
  const maxValues = getMaxValues(params);

  return Object.keys(maxValues).reduce((result, id) => (
    result < maxValues[id] ? maxValues[id] : result
  ), 0);
};

const getPointsYColumns = (params: Params, maxValue: number) => {
  const { data, state } = params;
  const { columns } = data;

  return columns.reduce((result, column) => {
    const id = column[0];

    if (isLine(data, id) && checkStatusLine(state, id)) {
    }

    return result;
  }, {});
};

function formatData(params: Params) {
  console.time('formatData');

  const maxValue = getMaxValueLines(params);
  const pointsY = getPointsYColumns(params, maxValue);

  console.log(maxValue, pointsY);

  console.timeEnd('formatData');
}

export default formatData;