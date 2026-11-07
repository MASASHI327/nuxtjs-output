<script setup>
import { provide } from 'vue';
import { useTodoProvider } from '../composables/useTodoProvider';
import {
  originTodoListInjectionKey,
  showTodoListInjectionKey,
  searchKeywordInjectionKey,
  fetchTodoListInjectionKey,
  addTodoInjectionKey,
  updateTodoInjectionKey,
  deleteTodoInjectionKey,
} from './TodoProviderInjectionKey';

const {
  showTodoList,
  searchKeyword,
  fetchTodoList,
  originTodoList,
  addTodo,
  deleteTodo,
  updateTodo,
} = useTodoProvider();

provide(showTodoListInjectionKey, showTodoList);
provide(searchKeywordInjectionKey, searchKeyword);
provide(fetchTodoListInjectionKey, fetchTodoList);
provide(originTodoListInjectionKey, originTodoList);
provide(addTodoInjectionKey, addTodo);
provide(deleteTodoInjectionKey, deleteTodo);
provide(updateTodoInjectionKey, updateTodo);
</script>

<template>
<slot></slot>
</template>
