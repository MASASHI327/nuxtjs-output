import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authenticationApi } from "../apis/authApi";
import type { UserType } from "../types/user";
import { NAVIGATION_LIST, NAVIGATION_PATH } from "../constants/navigation";

export const useAuthProvider = () => {
  const route = useRoute();
  const router = useRouter();
  const user = ref<UserType | undefined>(undefined);
  const isAuth = computed(() => !!user.value);

  const signIn = async (targetUser: UserType) => {
    user.value = targetUser;
  };

  const signOut = async () => {
    // ログアウト処理
    user.value = undefined;
  };

  // 認証前のページかどうかを判定
  const isExitBeforeAuthPage = () => {
    return (
      route.path === NAVIGATION_PATH.SIGNIN ||
      route.path === NAVIGATION_PATH.SIGNUP
    );
  };

  // 認証ルーティング
  const authRouting = async () => {
    let auth = false;
    const res = await authenticationApi();
    if (res?.data?.user) {
      user.value = res.data.user;
      auth = true;
    }

    // 未ログインでログイン後のページにいる場合、ログイン画面にリダイレクト
    if (!auth && !isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.SIGNIN);
    // ログイン済で未ログインのページにいる場合、Todo一覧ページにリダイレクト
    if (auth && isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.TOP);
  };

  onMounted(() => {
    authRouting();
  });

  return { user, isAuth, signIn, signOut };
};