<template>
  <div>
    <h3>
      <button class="enter-new-tag">作成</button>
    </h3>
  </div>
</template>

<script></script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";

.enter-new-tag {
  @include center-position;
  @include font-button-text;
  background-color: $background-color-buttonSubmitModal;
  color: white;
  width: 45px;
  height: 25px;
  // text-align: center;
}
</style>
