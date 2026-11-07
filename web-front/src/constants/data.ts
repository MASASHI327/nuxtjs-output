import type { TodoType } from '../types/todo';

export const INIT_TODO_LIST: Array<TodoType> = [
  {
    id: 1,
    title: 'Todo1',
    content: 'Todo1の内容',
  },
  {
    id: 2,
    title: 'Todo2',
    content: 'Todo2の内容',
  },
];

export const INIT_UNIQUE_ID = INIT_TODO_LIST.length;
