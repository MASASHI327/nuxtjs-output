<script setup lang="ts">
import { inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseLayout from '../Organisms/BaseLayout.vue';
import InputForm from '../Atoms/InputForm.vue';
import TextArea from '../Atoms/TextArea.vue';
import CommonButton from '../Atoms/CommonButton.vue';
import { NAVIGATION_PATH } from '../../constants/navigation';
import {
  originTodoListInjectionKey,
  updateTodoInjectionKey,
} from '../../providers/TodoProviderInjectionKey';

const router = useRouter();
const route = useRoute();
const todoId = route.params.id;

const originTodoList = inject(originTodoListInjectionKey);
const updateTodo = inject(updateTodoInjectionKey);
const todo = originTodoList
  ? originTodoList.value.find((todo) => String(todo.id) === todoId)
  : undefined;

const submitUpdateTodo = (e: Event) => {
  e.preventDefault();
  if (!updateTodo) return;
  const formElements = (e.target as HTMLFormElement).elements;
  const title = (formElements.namedItem('title') as HTMLInputElement).value;
  const content = (formElements.namedItem('content') as HTMLTextAreaElement)
    .value;
  updateTodo(String(todoId), title, content);
  router.push(`${NAVIGATION_PATH.TOP}`);
};
</script>

<template>
  <BaseLayout title="Edit Todo" >
    <form v-if="todo" class="container" @submit.prevent="submitUpdateTodo">
      <div class="area">
        <InputForm v-model="todo.title" name="title" placeholder="Title" />
      </div>
      <div class="area">
        <TextArea v-model="todo.content" name="content" placeholder="Content" />
      </div>
      <div class="area">
        <CommonButton type="submit" label="Update" />
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
