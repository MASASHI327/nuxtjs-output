<script setup lang="ts">
import { provide } from "vue";
import { useAuthProvider } from "../composables/useAuthProvider";
import {
  userInjectionKey,
  isAuthInjectionKey,
  signInInjectionKey,
  signOutInjectionKey,
} from "./AuthProviderInjectionKey";

const { user, isAuth, signIn, signOut } = useAuthProvider();

provide(userInjectionKey, user);
provide(isAuthInjectionKey, isAuth);
provide(signInInjectionKey, signIn);
provide(signOutInjectionKey, signOut);
</script>

<template>
  <slot />
</template>