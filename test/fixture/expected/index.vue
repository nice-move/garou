<template>
  <!-- jj -->
  <!-- ✗ BAD -->
  <!--
    ✗ BAD
    d
  -->
  <img id="" class="" data-id="" />
</template>

<script>
/* This is a comment with no whitespace at the beginning */
import { foo, z } from 'bar';

class A {
  constructor() {}

  a() {}
}

function a() {}

export default {
  name: 'd',
  data() {},
  a: `${5 ** 2}`,
  kk: '444"',
};
</script>

<style>
/* stylelint-disable block-no-empty, unit-no-unknown */
body {
  height: 2;
  width: 0px;
}
DIV::-moz-placeholder {
  opacity: 50%;
  -moz-appearance: -webkit-flex;
  color: #fff;
  display: BLOCK;
}

/*comment*/
div:before {
  --foo: hsl(198deg 28% 50%);
  color: rgba(255, 255, 255, 0.5);
  @media (-webkit-min-device-pixel-ratio>1) {
  }
}
@-webkit-keyframes {
  0% {
    -webkit-transform: Calc(1px+2px);
  }
}
</style>

<style lang="less">
/* stylelint-disable block-no-empty, unit-no-unknown */
body {
  height: 2;
  width: 0px;

  DIV::-moz-placeholder {
    opacity: 50%;
    -moz-appearance: -webkit-flex;
    color: #fff;
    display: BLOCK;
  }
}
/*comment*/
div:before {
  --foo: hsl(198deg 28% 50%);
  color: rgba(255, 255, 255, 0.5);
  @media (-webkit-min-device-pixel-ratio>1) {
  }
}
@-webkit-keyframes {
  0% {
    -webkit-transform: Calc(1px+2px);
  }
}
</style>

<style lang="scss">
/* stylelint-disable scss/function-quote-no-quoted-strings-inside, scss/no-global-function-names */
body {
  height: 2;
  width: 0px;

  DIV::-moz-placeholder {
    opacity: 50%;
    -moz-appearance: -webkit-flex;
    color: #fff;
    display: BLOCK;
  }
}
/*comment*/
div:before {
  --foo: hsl(198deg 28% 50%);
  color: rgba(255, 255, 255, 0.5);
  @media (-webkit-min-device-pixel-ratio>1) {
  }
}
@-webkit-keyframes {
  0% {
    -webkit-transform: Calc(1px+2px);
  }
}
// s
@include main;

@if ($r) {
  display: unquote('block');
  $d: 3;
  content: quote('left');
}
</style>
