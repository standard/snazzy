# snazzy [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/snazzy/master.svg
[travis-url]: https://travis-ci.org/feross/snazzy
[npm-image]: https://img.shields.io/npm/v/snazzy.svg
[npm-url]: https://npmjs.org/package/snazzy
[downloads-image]: https://img.shields.io/npm/dm/snazzy.svg
[downloads-url]: https://npmjs.org/package/snazzy
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### Format [JavaScript Standard Style](https://github.com/feross/standard) as Stylish (i.e. snazzy) output

Converts "compact" text from a linter to "stylish" (i.e. snazzy) output.

![after](img/after.png)

Compared to before:

![before](img/before.png)

## install

```
npm install -g snazzy
```

## usage

Pipe "compact" text into the `snazzy` command to get back pretty results:

```bash
$ standard --verbose | snazzy
```

Or, just run `snazzy` directly and it will run `standard` and give you pretty results:

```bash
$ snazzy
```

`snazzy` supports all command line flags that `standard` supports:

```bash
$ snazzy --format --verbose test1.js test2.js
```

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
