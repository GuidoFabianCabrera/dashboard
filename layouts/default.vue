<template>
  <v-app app>
    <LayoutSidenav v-if="$nuxt.$route.path.includes('/dashboard')" />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import LayoutSidenav from "@/components/Layouts/Sidenav";
export default {
  components: {
    LayoutSidenav
  }
};
</script>
