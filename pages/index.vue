<template>
  <div></div>
</template>

<script>
export default {
  middleware({ redirect }) {
    return redirect("login");
  }
};
</script>

<style lang="scss" scoped></style>
