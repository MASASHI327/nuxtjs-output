<script setup lang="ts">
import AuthProvider from "./providers/AuthProvider.vue";
import TodoProvider from "./providers/TodoProvider.vue";
import "./style.css";
</script>

<template>
  <AuthProvider>
   <TodoProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
   </TodoProvider>
  </AuthProvider>
</template>