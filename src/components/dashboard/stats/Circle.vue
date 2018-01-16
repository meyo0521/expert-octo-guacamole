<template>
  <div class="column is-narrow">
    <b-tooltip :label="description" position="is-top">
      <div class="circle" :data-title="text" :data-value="value"/>
    </b-tooltip>
  </div>
</template>
<script>
export default {
  name: 'StatsCircle',
  props: {
    text: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: [String, Number], default: '' },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../style/vars.scss";
.tooltip {
  border-radius: 50%;
  .circle:hover {
    background-color: #444;
  }
}
@mixin inner-content($fromTop) {
  margin: auto;
  position: absolute;
  width: 100%;
  text-align: center;
  margin-top: $fromTop;
  font-family: "Montserrat";
  font-weight: bold;
}
.circle {
  width: 80px;
  position: relative;
  height: 80px;
  border-radius: 50%;
  background-color: $background;
  overflow: hidden;
  &::after {
    @include inner-content(13px);
    content: attr(data-title);
    font-size: 75%;
  }
  &::before {
    @include inner-content(42%);
    content: attr(data-value);
    font-size: 110%;
  }
}
</style>
