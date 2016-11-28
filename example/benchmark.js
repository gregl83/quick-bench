var Benchmark = require('../')

var benchmark = new Benchmark()

benchmark.start()

benchmark.event('eventLabelOne')

benchmark.event('eventLabelOne')

benchmark.event('eventLabelTwo')

console.log(benchmark.results())