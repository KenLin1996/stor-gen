<template>
  <v-container class="d-flex align-center justify-center h-100" fluid>
    <v-container
      class="text-center pa-8 rounded-lg elevation-4"
      style="
        width: 500px;
        background-color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
      "
    >
      <v-row class="d-flex flex-column justify-center">
        <v-col class="d-flex flex-column justify-center align-center my-2">
          <router-link to="/">
            <v-img
              class="my-2"
              :width="100"
              aspect-ratio="1/1"
              cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
          </router-link>
          <!--  -->
          <v-btn
            outlined
            border
            style="background-color: #ffffff"
            color="#000000"
            prepend-icon="mdi-google"
            class="my-2 elevation-1 w-66 h-25"
            variant="plain"
            to="/login"
          >
            使用 Google 註冊
          </v-btn>
          <v-btn
            outlined
            border
            style="background-color: #ffffff"
            color="#000000"
            size="default"
            prepend-icon="mdi-facebook"
            class="my-2 elevation-1 w-66 h-25"
            variant="plain"
            to="/login"
          >
            使用 Facebook 註冊
          </v-btn>
        </v-col>
        <v-divider class="my-2"></v-divider>
        <v-col cols="12">
          <v-form @submit.prevent="submit" :disabled="isSubmitting">
            <v-text-field
              label="信箱"
              type="email"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
            ></v-text-field>

            <v-text-field
              label="暱稱"
              minlength="3"
              maxlength="20"
              counter
              v-model="username.value.value"
              :error-messages="username.errorMessage.value"
            ></v-text-field>

            <v-text-field
              label="密碼"
              :type="showPassword ? 'text' : 'password'"
              minlength="4"
              maxlength="20"
              counter
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="togglePasswordVisibility"
            ></v-text-field>
            <v-text-field
              label="確認密碼"
              :type="showPasswordConfirm ? 'text' : 'password'"
              minlength="4"
              maxlength="20"
              counter
              v-model="passwordConfirm.value.value"
              :error-messages="passwordConfirm.errorMessage.value"
              :append-inner-icon="
                showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append-inner="togglePasswordConfirmVisibility"
            ></v-text-field>

            <v-btn
              type="submit"
              outlined
              border
              style="
                background-color: #f4b942;
                font-weight: bold;
                font-size: 16px;
              "
              color="#000000"
              class="my-4 elevation-1 w-33"
              variant="solo"
              :loading="isSubmitting"
            >
              註冊
            </v-btn>
          </v-form>
          <v-btn class="" :ripple="false" variant="plain" to="/login">
            登入
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import validator from "validator";
import { useRouter } from "vue-router";
import { useApi } from "../composables/axios.js";
import { definePage } from "vue-router/auto";
import { useSnackbar } from "vuetify-use-dialog";

definePage({
  meta: {
    title: `界筆 ｜ 註冊`,
    login: false,
    admin: false,
  },
});

const { api } = useApi();
const router = useRouter();
const createSnackbar = useSnackbar();

const schema = yup.object({
  email: yup
    .string()
    .required("使用者信箱必填")
    .test("isEmail", "使用者信箱格式錯誤", (value) => {
      return validator.isEmail(value);
    }),
  username: yup
    .string()
    .required("使用者暱稱必填")
    .min(1, "使用者暱稱長度不符")
    .max(20, "使用者暱稱長度不符")
    .test(
      // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
      "isAlphanumeric",
      "使用者帳號格式錯誤",
      (value) => {
        return validator.isAlphanumeric(value);
      }
    ),
  password: yup
    .string()
    .required("使用者密碼必填")
    .min(4, "使用者密碼長度不符")
    .max(20, "使用者密碼長度不符"),
  passwordConfirm: yup.string().oneOf([yup.ref("password")], "密碼不一致"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const email = useField("email");
const username = useField("username");
const password = useField("password");
const passwordConfirm = useField("passwordConfirm");

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const togglePasswordConfirmVisibility = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value;
};

const submit = handleSubmit(async (values) => {
  try {
    await api.post("/user", {
      email: values.email,
      username: values.username,
      password: values.password,
    });
    createSnackbar({
      text: "註冊成功",
      snackbarProps: {
        color: "green",
      },
    });
    router.push("/");
  } catch (error) {
    console.log(error);
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
    });
  }
});
</script>
