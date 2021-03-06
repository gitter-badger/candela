/* globals emit, params, coerceValue, extractValue, findBinLabel, counter:true */

counter += 1;
if (counter >= params.offset &&
    (!(params.limit) || counter < params.offset + params.limit)) {
  var dataRow = this;
  emit('__passedFilters__', {
    histogram: [{
      count: 1,
      label: 'count'
    }]
  });
  var attrName;
  for (attrName in dataRow) {
    if (dataRow.hasOwnProperty(attrName)) {
      var value = extractValue(attrName, dataRow);
      value = coerceValue(value, params.binSettings[attrName].coerceToType);
      emit(attrName, {
        histogram: [{
          count: 1,
          label: findBinLabel(value,
            params.binSettings[attrName].coerceToType,
            params.binSettings[attrName].lowBound,
            params.binSettings[attrName].highBound,
            params.binSettings[attrName].specialBins,
            params.binSettings[attrName].ordinalBins)
        }]
      });
    }
  }
}
