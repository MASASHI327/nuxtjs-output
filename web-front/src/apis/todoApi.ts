import type { AxiosResponse } from "axios";
import { globalAxios,
        isAxiosError,
        type ResponseType,
        type IErrorResponse,
       } from "@/apis/config";
import type { TodoType } from "../types/todo";

/**
 * Todoリスト取得のAPI接続処理
 * @returns
 */
export const fetchTodoListApi = async () => {
  try {
     const { data }: AxiosResponse<Array<TodoType> & { code: number }> = await globalAxios.get(
      "/todolist"
    );
   const res: ResponseType<Array<TodoType>> = {
      code: data.code,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: "",
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};

/**
 * idに紐づく単一のTodo取得のAPI接続処理
 * @param id
 * @returns
 */
export const fetchTodoDetailApi = async (id: number) => {
  try {
    const { data }: AxiosResponse<TodoType & { code: number }> = await globalAxios.get(
      `/todo/${id}`
    );
    const res: ResponseType<TodoType> = {
      code: data.code,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: "",
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};

/**
 * Todo新規登録のAPI接続処理
 * @param title
 * @param content
 * @returns
 */
export const createTodoApi = async (title: string, content: string) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.post("/todo", {
      title,
      content,
    });
    const res: ResponseType<TodoType> = {
      code: 200,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: "",
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};

/**
 * Todo更新のAPI接続処理
 * @param id
 * @param title
 * @param content
 * @returns
 */
export const updateTodoApi = async (
  id: number,
  title: string,
  content: string
) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.patch(
      `/todo/${id}`,
      {
        id,
        title,
        content,
      }
    );
    const res: ResponseType<TodoType> = {
      code: 200,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: "",
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};

/**
 * Todo削除のAPI接続処理
 * @param id
 * @returns
 */
export const deleteTodoApi = async (id: number) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.delete(
      `/todo/${id}`
    );
    const res: ResponseType<TodoType> = {
      code: 200,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: "",
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};