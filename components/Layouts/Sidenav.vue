<template>
  <div class="test">
    <v-card height="100%">
      <v-navigation-drawer permanent expand-on-hover>
        <v-list nav dense class="d-flex flex-column" style="height:100vh">
          <NuxtLink to="/dashboard/characters" class="text-decoration-none">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Character
              </v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink to="/dashboard/locations" class="text-decoration-none">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Location
              </v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink to="/dashboard/episodes" class="text-decoration-none">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Episode
              </v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <a @click="submitLogOut" class="mt-auto text-decoration-none">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Log out
              </v-list-item-title>
            </v-list-item>
          </a>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async submitLogOut() {
      try {
        this.$cookies.set("token", "");
        this.$repository.request.setToken("", "Bearer");
        this.$router.push("/login");
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils";

.test {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
