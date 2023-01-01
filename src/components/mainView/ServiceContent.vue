<template lang="pug">
.service-content
  .service-content__game(:class="serviceId && 'active'")
    div(style="height: 600px")
      ladder-game(num-of-people="10")

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LadderGame from '@/components/games/LadderGame.vue';

export default defineComponent({
  name: 'ServiceContent',
  components: { LadderGame },
  props: {
    serviceId: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    console.log(props.serviceId);
  },
});
</script>

<style lang="scss" scoped>
.service-content {
  margin: 0;
  background: #ddd;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  &__game {
    max-height: 0;
    transition: 0.7s max-height ease-in-out;
    &.active {
      max-height: 700px;
    }
  }
}
</style>
