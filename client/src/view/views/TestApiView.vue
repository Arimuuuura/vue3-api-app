<template>
<div>
  Test Api
  <p>{{ test }}</p>
</div>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore()
    const test = computed(() => {
      console.log(store.state.TestApiState.val);
      return store.state.TestApiState.val
    })

    onMounted(() => {
      store.dispatch('TestApiState/fetch')
    })

    return {
      test
    }
  },
})
</script>
