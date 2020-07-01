tinypage
=============

Useful when you need a small index.html which does a few things and supports IE11.

- Write modern js and let babel transpile down to IE11
- Babel automatically selects corejs polyfills based on what your code contains
- js (and css which is imported into js) is inlined into a single html file

Keep in mind that more polyfills = more filesize! Maybe don't use `async/await`?

Usage
-----------

You must specify the html template, the javascript entrypoint, and the output html file

    tinypage --template index.ejs --entry index.js --outfile index.html

You can `import` css files in your `index.js` and it will be inlined to the output file. Images referenced in the html and css will also be inlined. Inline all the things!
