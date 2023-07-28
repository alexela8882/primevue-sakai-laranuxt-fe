<script setup>

const router = useRouter()

onMounted(() => {
  window.location = "http://localhost:8000/api/azure/callback"
})

</script>

<template>
  <div>
    Redirecting...
  </div>
</template>

<style scoped>

</style>