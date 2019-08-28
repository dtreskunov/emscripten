/*
 * Copyright 2019 The Emscripten Authors.  All rights reserved.
 * Emscripten is available under two separate licenses, the MIT license and the
 * University of Illinois/NCSA Open Source License.  Both these licenses can be
 * found in the LICENSE file.
 *
 * C++ exception handling support stubs. This is included when exception
 * throwing is disabled - so no exceptions should exist at all. If the code still
 * uses them, these stubs will throw at runtime.
 */

mergeInto(LibraryManager.library, {
  proc_exit__deps: ['exit'],
  proc_exit: function(code) {
    return _exit(code);
  },

  fd_write__deps: ['$SYSCALLS'],
  fd_write: function(fd, iovs, num, out) {
console.log('waka ', [fd, iovs, num, out, new Error().stack]);
    var written = SYSCALLS.nonFSWritev(fd, iovs, num);
console.log('  wrote ', [written, out]);
    if (out) {{{ makeSetValue('out', 0, 'written', 'i32') }}};
    return 0;
  },
});
