<template lang="pug">
#mainView
  .main-card
    .intro
      h1.intro__main-text Random Choice Service
      span.intro__describe Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
    .service-content
      router-view(v-slot="{ Component, route }")
        component(:is="Component")
    service-selector(:selected="path" @change="pathChange")
</template>
<script lang="ts">
//service-content(:service-id="selected")
import ServiceSelector from '@/components/mainView/ServiceSelector.vue';
import { computed, defineComponent } from 'vue';
import LadderGame from '@/views/LadderGame.vue';
import { useRoute, useRouter } from 'vue-router';
// todo: service-content view router로 전환할 것 (해당 service 페이지는 페이지 전환시 show/hide animation 적용)
export default defineComponent({
  name: 'MainView',
  components: { LadderGame, ServiceSelector },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const path = computed(() => route.path);

    const pathChange = (path: string) => {
      const content = document.querySelector('.service-content') as HTMLElement;
      content.classList.add('disable');
      setTimeout(() => {
        content.classList.remove('disable');
        router.push(path);
      }, 1000);
    };
    return { path, pathChange };
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
    width: 900px;
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
    .service-content {
      position: relative;
      margin: 0;
      background: #333;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      max-height: 800px;
      transition: 1s max-height ease-in-out;
      &.disable {
        max-height: 0;
      }
    }
  }
}
</style>
