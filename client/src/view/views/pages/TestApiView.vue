<template>
  <div>
    Test Api
    <p>{{ test }}</p>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const test = computed(() => {
      return store.state.TestApiState.val
    })

    onMounted(() => {
      store.dispatch('TestApiState/fetch')
    })

    return {
      test,
    }
  },
})
</script>
