<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { signInInjectionKey } from "../../providers/AuthProviderInjectionKey";
import { signInApi } from "../../apis/authApi";
import InputForm from "../Atoms/InputForm.vue";
import CommonButton from "../Atoms/CommonButton.vue";
import { NAVIGATION_PATH } from "../../constants/navigation";

const router = useRouter();

const signIn = inject(signInInjectionKey);

const signupPath = NAVIGATION_PATH.SIGNUP;

const submitSignIn = async (e: Event) => {
  e.preventDefault();
  if (!signIn) return;
  const formElements = (e.target as HTMLFormElement).elements;
  const email = (formElements.namedItem("email") as HTMLInputElement).value;
  const password = (formElements.namedItem("password") as HTMLInputElement)
    .value;
  const res = await signInApi(email, password);
  if (res?.code === 401) {
    alert("メールアドレスもしくはパスワードが有効ではありません");
    return;
  }
  if (res?.code === 500) {
    alert("サーバーエラーが発生しました");
    return;
  }
  if (res?.data?.user) {
    signIn(res.data.user);
    localStorage.setItem("access_token", res.data.accessToken);
    router.push(`${NAVIGATION_PATH.TOP}`);
  }
};
</script>

<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <form class="form" @submit.prevent="submitSignIn">
      <div class="area">
        <InputForm type="email" name="email" placeholder="email" />
      </div>
      <div class="area">
        <InputForm type="password" name="password" placeholder="password" />
      </div>
      <div class="area">
        <CommonButton type="submit" label="login" />
      </div>
      <div class="link">
        <NuxtLink :to="signupPath">&lt;&lt; to signup page</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  width: 90%;
  margin: 0px auto;
}

@media screen and (min-width: 960px) {
  .container {
    width: 50%;
    margin: 0px auto;
  }
}

.title {
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  color: #fff;
  font-size: 48px;
}

.form {
  width: 80%;
  margin: 40px auto;
}

.area {
  margin-top: 40px;
}

.link {
  margin-top: 20px;
}

.link > a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}

.link > a:hover {
  color: #d87e00;
}
</style>