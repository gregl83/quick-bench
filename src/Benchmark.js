/**
 * JavaScript Benchmark Object
 *
 * @constructor
 */
function Benchmark() {
  var self = this;

  self._start = self._end = Date.now();

  self._events = {};

  self._ended = false;

  self._results = {elapsedTime: 0, events: {}};
}


/**
 * Set Benchmark Results
 */
Benchmark.setResults = function() {
  var self = this;

  self._results.elapsedTime = self._end - self._start;

  Object.keys(self._events).forEach(function(event) {
    self._results.events[event] = {
      total: self._events[event],
      perSecond: Math.floor(self._events[event] / (self._results.elapsedTime / 1000))
    };
  });
};


/**
 * Record Start Time
 *
 * @returns {number} start time ms
 */
Benchmark.prototype.start = function() {
  var self = this;

  self._start = Date.now();

  return self._start;
};


/**
 * Record End Time
 *
 * @returns {number} end time ms
 */
Benchmark.prototype.end = function() {
  var self = this;

  self._ended = true;
  self._end = Date.now();

  return self._end;
};


/**
 * Log Event (increment event count by one)
 *
 * @param {string} name
 * @returns {number}
 */
Benchmark.prototype.event = function(name) {
  if ('number' === typeof this._events[name]) return ++this._events[name];
  this._events[name] = 1;
};


/**
 * Return Benchmark Results
 *
 * @returns {object} results
 */
Benchmark.prototype.results = function() {
  var self = this;

  if (!self._ended) self.end();

  Benchmark.setResults.call(self);

  return this._results;
};


module.exports = Benchmark;