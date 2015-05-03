/**
 * JavaScript Benchmark Object
 *
 * @param {object} options
 * @constructor
 */
function Benchmark(options) {
  var self = this;

  self._start = self._end = Date.now();

  self._events = {};

  if ('undefined' !== options.events) {
    options.events.forEach(function(event) {
      self._events[event] = 0;
    });
  }

  self._ended = false;

  self._results = {elapsedTime: 0};
}


/**
 * Set Benchmark Results
 */
Benchmark.setResults = function() {
  var self = this;

  self._results.elapsedTime = self._end - self._start;

  Object.keys(self._events).forEach(function(event) {
    self._results[event] = {
      total: self._events[event],
      perSecond: Math.floor(self._events[event] / (self._results.elapsedTime / 1000))
    };
  });
};


/**
 * Record Start Time
 */
Benchmark.prototype.start = function() {
  this._start = Date.now();
};


/**
 * Record End Time
 */
Benchmark.prototype.end = function() {
  this._end = Date.now();

  Benchmark.setResults.call(this);
};


/**
 * Log Event (increment event count by one)
 *
 * @param {string} name
 * @returns {number}
 */
Benchmark.prototype.event = function(name) {
  return ++this._events[name];
};


/**
 * Get Benchmark Results
 */
Benchmark.prototype.getResults = function() {
  var self = this;

  if (!self.ended) self.end();

  return this._results;
};


module.exports = Benchmark;