<script setup lang="ts">
type Props = {
  label?: string;
  type?: 'reset' | 'submit' | 'button';
  onClick?: () => void;
};

const { label, type = 'button', onClick } = defineProps<Props>();
</script>

<template>
  <button className="button" :type="type" @click="onClick">
    {{ label }}
  </button>
</template>

<style scoped>
.button {
  display: block;
  width: 100%;
  background-color: #ff9900;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  appearance: none;
  border-radius: 10px;
  transition: 0.3s;
}

.button:hover {
  background-color: #d87e00;
}
</style>
