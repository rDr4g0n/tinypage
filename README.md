tinypage
=============

Useful when you need a small index.html which does a few things and supports IE11.

- Write modern js and let babel transpile down to IE11
- Babel automatically selects corejs polyfills based on what your code contains
- js (and css which is imported into js) is inlined into a single html file

Things to keep in mind:

- more polyfills = more filesize! Maybe don't use `async/await`?
- images are inlined; make sure theyre small!
- be sure to import your css in your `index.js`

Usage
-----------

You can specify the html template, the javascript entrypoint, and the output html file

    tinypage --template index.ejs --entry index.js --outfile index.html

If your files are named matching the defaults, you can simply specify the directory to build from

    tinypage .

This will look in `./` for `index.ejs`, `index.js`, and create `index.html`.

Or mix n match as needed

    tinypage --outfile dist/my-page.html ./my-page

TODO
----------
- specify additional polyfills
- cli help output
