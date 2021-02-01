const {expectEvent} = require('@openzeppelin/test-helpers');

const expectEventWithParamsOverride = function (receipt, eventName, eventArgs, eventsParamsOverrides) {
  const overrideFn = eventsParamsOverrides ? eventsParamsOverrides[eventName] : undefined;
  const params = overrideFn ? overrideFn(eventArgs) : eventArgs;
  return expectEvent(receipt, eventName, params);
};

const expectEventInTransactionWithParamsOverride = async function (txHash, emitter, eventName, eventArgs, eventsParamsOverrides) {
  const overrideFn = eventsParamsOverrides ? eventsParamsOverrides[eventName] : undefined;
  const params = overrideFn ? overrideFn(eventArgs) : eventArgs;
  return expectEvent.inTransaction(txHash, emitter, eventName, params);
};

module.exports = {
  expectEventWithParamsOverride,
  expectEventInTransactionWithParamsOverride,
};
