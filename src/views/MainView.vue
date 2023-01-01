<template lang="pug">
#mainView
  .main-card
    .intro
      h1.intro__main-text Random Choice Service
      span.intro__describe Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
    service-content(:service-id="selected")
    service-list(v-model="selected")
</template>
<script lang="ts">
import ServiceList from '@/components/mainView/ServiceList.vue';
import ServiceContent from '@/components/mainView/ServiceContent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainView',
  components: { ServiceContent, ServiceList },
  data() {
    return {
      selected: null,
    };
  },
});
</script>

<style lang="scss" scoped>
#mainView {
  position: relative;
  background: #f5f6f4;
  width: 100vw;
  height: 100vh;
  font-family: $main-font;
  .main-card {
    position: absolute;
    background: white;
    box-shadow: $default-box-shadow;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: $default-padding 0;
    text-align: center;
    .intro {
      padding: $default-padding;
      padding-bottom: 50px;
      &__main-text {
        font-size: 4em;
        margin-bottom: 0.4em;
      }
      &__describe {
        color: $comment-text-color;
        line-height: 1.6em;
      }
    }
  }
}
</style>
