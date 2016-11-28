[![Build Status](https://travis-ci.org/gregl83/quick-bench.svg?branch=master)](https://travis-ci.org/gregl83/quick-bench)
[![Coverage Status](https://coveralls.io/repos/gregl83/quick-bench/badge.svg)](https://coveralls.io/r/gregl83/quick-bench?branch=master)
# quick-bench

JavaScript Quick Benchmark Tool

## Requirements

- NodeJS v5.11.x or higher
- NPM

See `./package.json`

## Installation

Source available on [GitHub](https://github.com/gregl83/quick-bench) or install module via NPM:

    $ npm install quick-bench

## Usage

After requiring quick-benchmark create a new instance. Call the start method, log some events, then call the end method and finally 
the results method to obtain quick benchmarks for JavaScript code.

```js
var Benchmark = require('quick-bench')

var benchmark = new Benchmark()

benchmark.start() // time is recorded in ms

// todo some application code

benchmark.event('eventLabelOne')

benchmark.event('eventLabelOne') // events should occur many times to get useful benchmarks

// todo some more application code

benchmark.event('eventLabelTwo') // n number of events can be logged

// todo perhaps some more code

var results = benchmark.results() // automatically calls benchmark.end()
```

The above will set the `results` variable equal to an object with the following format:

```js
{
    elapsedTime: milliseconds,
    events: {
        eventLabelOne: {
            total: 2,
            perSecond: total / (elapsedTime / 1000)
        },
        eventLabelTwo: {
            total: 1,
            perSecond: total / (elapsedTime / 1000)
        },
    }
}
```

That's it! As the module name implies this package is designed for quick benchmarks.

## License

MIT