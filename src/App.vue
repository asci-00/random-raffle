<template lang="pug">
  main-view
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainView from '@/views/MainView.vue';

@Options({
  components: {
    MainView,
  },
})
export default class App extends Vue {}
</script>

<style></style>
