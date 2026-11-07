<script setup>
import { inject } from 'vue';
import { showTodoListInjectionKey, deleteTodoInjectionKey} from '../../providers/TodoProviderInjectionKey';


const showTodoList = inject(showTodoListInjectionKey);
const deleteTodo = inject(deleteTodoInjectionKey);
</script>

<template>
  <ul class="list">
    <li v-for="(todo, index) in showTodoList" :key="index" class="todo">
      <span class="task">{{ todo.title }}</span>
      <div class="area">
        <div class="far">
          <NuxtLink :to="{ name: 'detail', params: { id: todo.id } }">
            <font-awesome-icon class="far" icon="fa-circle-info" />
          </NuxtLink>
        </div>
        <div class="far">
          <NuxtLink :to="{ name: 'edit', params: { id: todo.id } }">
            <font-awesome-icon class="far" icon="fa-pen-to-square" />
          </NuxtLink>
        </div>
        <div class="far">
          <font-awesome-icon
            class="far"
            icon="fa-trash"
            @click="deleteTodo(todo.id, todo.title)"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.list {
  padding: 0;
}

.todo {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  list-style: none;
  line-height: 1.5;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  height: 50px;
}

.task {
  cursor: pointer;
  display: block;
  padding-top: 8px;
  padding-left: 10px;
  font-size: 24px;
  font-family: 'Times New Roman', Times, serif;
  color: #fff;
}

.area {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  width: 130px;
  height: 30px;
}

.far {
  display: block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: #ff9900;
}
</style>
