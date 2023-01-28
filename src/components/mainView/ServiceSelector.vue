<template lang="pug">
.service-list
  figure.hover-box(
    v-for="(service, idx) in services"
    :class="service.path === selected && 'active'"
    :key="idx"
  )
    img(:src="service.icon" :alt="service.name")
    figcaption
      i {{ service.name }}
      a(@click="changeMenu(service.path)")

.service-guide Choice the game
</template>
<script lang="ts">
import { routes } from '@/router';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ServiceList',
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const changeMenu = (path: string) => {
      if (props.selected === path) return;
      emit('change', path);
    };
    const services = ref(routes.filter(({ isService }) => isService));
    return { changeMenu, services };
  },
});
</script>

<style lang="scss" scoped>
.service-list {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  &__item {
    cursor: pointer;
    width: 170px;
    height: 170px;
    text-align: center;
    line-height: 170px;
    border-radius: 50%;
    background: #eee;
  }
}
.service-guide {
  margin-bottom: 30px;
}
</style>
