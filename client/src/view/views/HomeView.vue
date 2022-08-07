<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent } from 'vue'
import HelloWorld from '@/view/components/HelloWorld.vue'


export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup() {

    return {
    }
  }
})
</script>
