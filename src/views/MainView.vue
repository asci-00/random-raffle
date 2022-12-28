<template lang="pug">
#mainView
  span test
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'MainView',
})
export default class MainView extends Vue {}
</script>

<style lang="scss" scoped>
#mainView {
  background: #f5f6f4;
  width: 100vw;
  height: 100vh;
  padding: $default-padding;
}
</style>
