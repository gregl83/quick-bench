var should = require('should');
var sinon = require('sinon');

var Benchmark = require('../');

describe('benchmark', function() {
  it('new initialization', function(done) {
    var benchmark = new Benchmark();

    (benchmark._events).should.be.type('object');

    (benchmark._ended).should.be.false;

    (benchmark._results.elapsedTime).should.be.zero;

    done();
  });

  it('start adds time', function(done) {
    var benchmark = new Benchmark();

    var start = benchmark._start;

    setTimeout(function() {
      var returned = benchmark.start();

      (returned).should.be.eql(benchmark._start);
      (benchmark._start).should.be.above(start);

      done();
    }, 5);
  });

  it('end adds time', function(done) {
    var benchmark = new Benchmark();

    benchmark.start();

    setTimeout(function() {
      var returned = benchmark.end();

      (returned).should.be.eql(benchmark._end);
      (benchmark._end).should.be.above(benchmark._start);

      done();
    }, 5);
  });

  it('end toggles ended flag', function(done) {
    var benchmark = new Benchmark();

    benchmark.start();

    benchmark.end();

    (benchmark._ended).should.be.true;

    done();
  });

  it('results returns event stats', function(done) {
    var events = ['first', 'second'];

    var benchmark = new Benchmark();

    var start = benchmark.start();

    benchmark.event(events[0]);

    benchmark.event(events[1]);
    benchmark.event(events[1]);

    setTimeout(function() {
      var end = benchmark.end();

      var results = benchmark.results();

      (results.elapsedTime).should.be.eql(end - start);

      (benchmark._events[events[0]]).should.be.eql(1);
      (results.events[events[0]].total).should.be.eql(1);
      (results.events[events[0]].perSecond).should.be.above(100);

      (benchmark._events[events[1]]).should.be.eql(2);
      (results.events[events[1]].total).should.be.eql(2);
      (results.events[events[1]].perSecond).should.be.above(100);

      done();
    }, 5);
  });

  it('results when event flag false', function(done) {
    var benchmark = new Benchmark();

    var end = sinon.spy(benchmark, 'end');

    benchmark.start();

    setTimeout(function() {
      var results = benchmark.results();

      (results).should.be.type('object');

      sinon.assert.calledOnce(end);

      done();
    }, 5);
  });
});