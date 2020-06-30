tinypage
=============

Useful when you need a small index.html which does a few things and supports IE11.

- Write modern js and let babel transpile down to IE11
- Babel automatically selects corejs polyfills based on what your code contains
- js (and css which is imported into js) is inlined into a single html file

Keep in mind that more polyfills = more filesize! Maybe don't use `async/await`?
