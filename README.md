# rpmExtract

[![npm](https://img.shields.io/npm/v/rpm-extract.svg)](https://www.npmjs.com/package/rpm-extract) [![Build Status](https://travis-ci.org/dowjones/rpm-extract.svg?branch=master)](https://travis-ci.org/dowjones/rpm-extract) [![Code Climate](https://codeclimate.com/github/dowjones/rpm-extract/badges/gpa.svg)](https://codeclimate.com/github/dowjones/rpm-extract) [![Coverage Status](https://coveralls.io/repos/github/dowjones/rpm-extract/badge.svg?branch=master)](https://coveralls.io/github/dowjones/rpm-extract?branch=master)

This module lets you programmatically extract files from an [rpm](https://en.wikipedia.org/wiki/RPM_Package_Manager) package.

**Note**: This module doesn't run `rpm install`, nor it lets you do so programmatically. 
This is a simple utility to extract files from an rpm package.

## Why not use `rpm2cpio`?
`rpm2cpio` is CLI tool to extract RPM packages on *nix distributions.
Its an excellent and powerful tool to work in shell, but creating a script that works cross platform, is not so trivial.
Furthermore, there is no interaction with file system (other than initial reading of the rpm), 
which makes this implementation faster than spawning child processes and doing file I/O.

## Install

```console
$ npm install rpm-extract
```

## Usage

```js
const rpmExtract = require('rpm-extract')

rpmExtract('path/to/file.rpm')
    .then(function(files) {
      // do something array of files
    })
    .catch(function(err){
      // handle errors
    })
```

## API

### `file` object
The `file` object contains the metadata as well as contents of the file. It includes:

| Property | Type                                                  | Description                                                                                 |
|----------|-------------------------------------------------------|---------------------------------------------------------------------------------------------|
| data     | [`Buffer`](https://nodejs.org/api/buffer.html)        | File's contents, in a NodeJS buffer instance.                                               |
| mode     | `string`                                              | Unix file permissions or [modes](https://en.wikipedia.org/wiki/Modes_(Unix)).               |
| mtime    | `string`                                              | Last [modification time](https://en.wikipedia.org/w/index.php?title=Mtime)                  |
| path     | `string`                                              | File path as was specified while creating the package.                                      |
| type     | `string`                                              | Unix file [type](https://en.wikipedia.org/wiki/Unix_file_types).                            |
| linkname | `string`                                              | [Symbolic Link](https://en.wikipedia.org/wiki/Symbolic_link) name, if the file is a link.   |


### `error` object

`error` object is an instance of standard Node JS [Error](https://nodejs.org/api/errors.html#errors_class_error)  

Currently, the module throws 2 known errors

 - `Not a valid rpm.` - if the file is not an rpm package
 - `Only gzip compressed cpio archives are supported.` - if the rpm was created from anything other than a `.tar.gz` archive.
 

## Tests

    $ npm install
    $ npm test

## Caveats
This module only supports rpm files created with GZip compression, since `gzip` is the most common format that works across different OS/platforms.
If you have a need for other compression formats such `xz`, `bzip2` etc. create an issue or better, send a Pull Request.

## References 

  - [how-do-i-extract-the-contents-of-an-rpm](http://stackoverflow.com/questions/18787375/how-do-i-extract-the-contents-of-an-rpm)
  - [rpm2cpio](https://github.com/ruda/rpm2cpio)
  
## License

[ISC](/LICENSE)


Released 2016 by [Hrusikesh Panda](https://github.com/mrchief) @ [Dow Jones](https://github.com/dowjones) 
