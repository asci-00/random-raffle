<template lang="pug">
.service-list
  figure.hover-box(
    v-for="(service, idx) in SERVICE"
    :class="service.name === modelValue && 'active'"
    :key="idx"
  )
    img(:src="service.icon" :alt="service.name")
    figcaption
      i {{ service.name }}
      a(@click="serviceClick(service.name)")

.service-guide Choice the game
</template>
<script lang="ts">
import { SERVICE } from '@/components/mainView/constants';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServiceList',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const serviceClick = (name: string) => {
      if (props.modelValue === name) emit('update:modelValue', null);
      else emit('update:modelValue', name);
      emit('change');
    };
    return { SERVICE, serviceClick };
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
