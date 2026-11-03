<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { signInInjectionKey } from "../../providers/AuthProviderInjectionKey";
import { signUpApi } from "../../apis/authApi";
import InputForm from "../Atoms/InputForm.vue";
import CommonButton from "../Atoms/CommonButton.vue";
import { NAVIGATION_PATH } from "../../constants/navigation";

const router = useRouter();
const signIn = inject(signInInjectionKey);
const signinPath = NAVIGATION_PATH.SIGNIN;

const submitSignUp = async (e: Event) => {
  e.preventDefault();
  if (!signIn) return;
  const formElements = (e.target as HTMLFormElement).elements;
  const name = (formElements.namedItem("name") as HTMLInputElement).value;
  const email = (formElements.namedItem("email") as HTMLInputElement).value;
  const password = (formElements.namedItem("password") as HTMLInputElement)
    .value;
  const passwordConfirm = (
    formElements.namedItem("passwordConfirm") as HTMLInputElement
  ).value;

  if (!name || !email || !password || !passwordConfirm) {
    //alert("Please fill in all fields");
    alert("名前、メールアドレス、パスワード全て入力してください");
    return;
  }
  if (password !== passwordConfirm) {
    //alert("Password and password confirm are different");
    alert("パスワードと確認用パスワードが違っています");
    return;
  }

  const res = await signUpApi(name, email, password);
  if (res?.code === 400) {
    //alert("Invalid email or password");
    alert("メールアドレスもしくはパスワードが有効ではありません");
    return;
  }
  if (res?.code === 500) {
    //alert("Internal server error");
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
    <h1 class="title">SignUp</h1>
    <form class="form" @submit.prevent="submitSignUp">
      <div class="area">
        <InputForm type="text" name="name" placeholder="name" />
      </div>
      <div class="area">
        <InputForm type="email" name="email" placeholder="email" />
      </div>
      <div class="area">
        <InputForm type="password" name="password" placeholder="password" />
      </div>
      <div class="area">
        <InputForm
          type="password"
          name="passwordConfirm"
          placeholder="password confirm"
        />
      </div>
      <div class="area">
        <CommonButton type="submit" label="signup" />
      </div>
      <div class="link">
        <NuxtLink :to="signinPath">&lt;&lt; to signin page</NuxtLink>
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