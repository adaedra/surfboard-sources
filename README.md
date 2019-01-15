# 🌊 Surfboard

![Package version](https://img.shields.io/npm/v/@surfboard/sources.svg?style=flat&logo=npm)
![License](https://img.shields.io/github/license/adaedra/surfboard-sources.svg)
![Build status](https://img.shields.io/circleci/project/github/adaedra/surfboard-sources/master.svg?style=flat&logo=circleci)

Surfboard is a modular dashboard project, based on modern web development tools (JavaScript, React,
Rx).
The aim is to create a tool that adapts to the need of its users and not the other way around, by
providing just the needed functional bricks to build your dashboard but leave all flexibility to
the user.

## `@surfboard/sources`

This package aims at providing some ready to use methods to build sources for surfboard easily.

## Warning

This project is still in initial development and is not completely ready yet for prime time. You
can toy with it, but be aware that big changes can arise at any moment while this project hasn't
reached the 1.0 release. Also, documentation and inter-packages dependencies may be a bit wonky
during this time.

## How to

Sources are functions that can be called to generate data. They have to be coupled with a
scheduler to become observables.

```js
// surfboard.server.js
const { http, schedule } from '@surfboard/sources'

const sources = {
    http: schedule(
        '0 0,30 * * * *', http('https://service.example/data.json', {}, res => res.json())
    )
}

module.exports = { sources }
```

This will create a scheduler that will fetch the content of the given URL and parse the JSON result
every 30 minutes. See the [node-schedule package](https://www.npmjs.com/package/node-schedule) for
more information about accepted rules for the `schedule` method.

The `http` source takes the same arguments as `fetch`, plus an optional transformation function
to get data from the resource. You can also use rxjs's `pipe` to transform the data at will, the
request will be passed as-is if you don't provide a transformer.
