# Shared epilogue example

`multiple-returns.picoc` replaces the former `add_one` example in the three
slides under README anchor `1132-shared-function-epilogue-and-return-values`.
It has one `main`, an `if` / `else`, and two explicit returns. The runtime
`argc` condition keeps both branches visible in the generated code.

Generated using the local PicoC-Compiler at commit
`182e12378a88520cde6bce08edd68e41f539b012` (release `v2.1.1`):

```sh
$ picoc_compiler -c -O1 -v -w multiple-returns.picoc
```

The saved `.picoc_anf` and `.reti_blocks` files are the actual compiler output.
The machine-specific `# @picoc-cache` record is removed from
`.reti_blocks`, and trailing whitespace is trimmed from ANF output; all code
and pattern comments are retained. The compiler
reports the unused `argv` parameter, which preserves the normal main signature.
The slide code columns reconstruct each complete saved file exactly.
Both branches assign the result to `IN2` and jump to `main_epilogue`, which
restores the stack frame and return address once.

These are presentation examples; the PicoOS repository and its README source
snapshot were not changed.
