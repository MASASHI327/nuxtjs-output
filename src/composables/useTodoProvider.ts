import { ref, computed } from 'vue';
import { INIT_TODO_LIST} from '../constants/data';
import type { TodoType } from '../types/todo';
import {
  fetchTodoListApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi
} from "../apis/todoApi";

console.log("useTodoProvaiders loaded");
export function useTodoProvider() {
  const originTodoList = ref(INIT_TODO_LIST);
  const searchKeyword = ref('');
  
  const fetchTodoList = async () => {
    const res = await fetchTodoListApi();
    if (Array.isArray(res.data)) originTodoList.value = res.data;
  };

  // 表示用のTodoリストを返す算出プロパティ
  const showTodoList = computed(() => {
    console.trace();
    return originTodoList.value.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      const regexp = new RegExp('^' + searchKeyword.value, 'i');
      return todo.title.match(regexp);
    });
  });

  const addTodo = async (title: string, content: string) => {
    if (title.trim() !== '' && content.trim() !== '') {
      const res = await createTodoApi(title, content);
      if (res.data && typeof res.data !== "string") originTodoList.value.push(res.data);
    }
  };

  const updateTodo =  async (
    targetId: string,
    title: string,
    content: string
  ) => {
    if (title.trim() === "" || content.trim() === "") return;
    const todoId = Number(targetId);
    if (Number.isNaN(todoId)) return;
    const res = await updateTodoApi(todoId, title, content);
    const updatedTodo = res.data as TodoType;
    if (updatedTodo && typeof updatedTodo !== "string") {
      const newTodoList = originTodoList.value.map((todo) => {
        return todo.id === todoId ? 
        updatedTodo: todo;
      })  
      originTodoList.value = newTodoList;
    }
  };

  const deleteTodo = (targetId: number, targetTitle: string) => {
    if (window.confirm(`「${targetTitle}」を削除しますか？`)) {
      const todoId = Number(targetId);
      if (Number.isNaN(todoId)) return;
      deleteTodoApi(Number(targetId));
      const newTodoList = originTodoList.value.filter((todo) => {
        return todo.id !== targetId;
      });
      originTodoList.value = newTodoList;
    }
  };
  return {
    addTodo,
    showTodoList,
    fetchTodoList,
    deleteTodo,
    searchKeyword,
    originTodoList,
    updateTodo,
  };
}
