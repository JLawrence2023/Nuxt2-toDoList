<template>
  <header>
    <nav class="navbar">
      <div class="navbar-text-container">
        <nuxt-link to="/" class="navbar-text">ToDo</nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import "../../assets//styles/variables.scss";
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/main.scss";

.navbar {
  @include center-position;
  @include box-shadow;
  background-color: $secondary-color;
  align-items: flex-end;
  margin: 0;
  padding: 0;
}

.navbar-text-container {
  @include center-position;
  width: 202px;
  height: 70px;
}
</style>
