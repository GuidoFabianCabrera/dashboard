<template>
  <div class="login__container custom_container custom_container--sm">
    <v-card elevation="2">
      <!-- <NuxtLink class="black--text text-decoration-none w_100" to="/"
        ><v-btn color="primary" outlined block>Home</v-btn></NuxtLink
      > -->
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submitForm"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            class="mb-4"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="
              !(this.valid && !this.email == false && !this.password == false)
            "
            >Submit</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 6) || "Password must be more than 6 characters"
    ]
  }),
  methods: {
    async submitForm() {
      try {
        const data = await this.$repository.login.createOne({
          email: this.email,
          password: this.password
        });
        this.$cookies.set("token", data.access_token);
        this.$repository.request.setToken(data.access_token, "Bearer");
        this.$router.push("/dashboard/characters");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils";

.login__container {
  height: 100vh;
  display: grid;
  align-content: center;
}
</style>
