<template>
  <div>
    user
    <div v-for="user in users" :key="user.id">
      <p>{{ user.id }}</p>
      <p>{{ user.name }}</p>
      <p>{{ user.age }}</p>
      <p>{{ user.address }}</p>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const users = computed(() => {
      return store.state.UserApiState.users
    })

    onMounted(() => {
      store.dispatch('UserApiState/fetch')
    })

    return {
      users,
    }
  },
})
</script>
