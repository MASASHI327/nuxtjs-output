<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '../Organisms/BaseLayout.vue';
import InputForm from '../Atoms/InputForm.vue';
import TextArea from '../Atoms/TextArea.vue';
import CommonButton from '../Atoms/CommonButton.vue';
import { NAVIGATION_PATH } from '../../constants/navigation';
import { addTodoInjectionKey } from '../../providers/TodoProviderInjectionKey';

const router = useRouter();
const addTodo = inject(addTodoInjectionKey);

const submitAddTodo = (e: Event) => {
  e.preventDefault();
  const formElements = (e.target as HTMLFormElement).elements;
  const title = (formElements.namedItem('title') as HTMLInputElement).value;
  const content = (formElements.namedItem('content') as HTMLTextAreaElement)
    .value;
  if (!addTodo) return;
  addTodo(title, content);
  router.push(`${NAVIGATION_PATH.TOP}`);
};
</script>

<template>
  <BaseLayout title="Create Todo">
    <form class="container" @submit.prevent="submitAddTodo">
      <div class="area">
        <InputForm name="title" placeholder="Title" />
      </div>
      <div class="area">
        <TextArea name="content" placeholder="Content" />
      </div>
      <div class="area">
        <CommonButton type="submit" label="Create" />
      </div>
    </form>
  </BaseLayout>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 40px auto;
}

.area {
  margin-top: 40px;
}
</style>
