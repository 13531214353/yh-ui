<template>
  <Button></Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const button = require("../lib/button/index");

console.log(button);

export default defineComponent({
  name: "App",
  components: { button },
});
</script>

<style lang="less"></style>
