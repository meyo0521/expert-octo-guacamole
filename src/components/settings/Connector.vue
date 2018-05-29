<template>
  <div>
    <b-tooltip :label="connector.name" position="is-right" type="is-info" >
      <img src="../../assets/slack.png"
           @click="$emit('connect', connector)"
           :style="{width: 40+'px', height: 40+'px', 'border-radius': '50%'}"
           class="is-rounded">
    </b-tooltip>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { path } from 'ramda';

export default {
  name: 'Connector',
  props: { connector: { type: Object, required: true } },
  computed: {
    ...mapGetters(['myProfile']),
    id() {
      return this.connector.bot.id;
    },
    isConnected() {
      return !!path(['myProfile', 'meta', 'slack', this.id], this);
    },
  },
};
</script>
<style lang="scss">
@import "../../style/vars.scss";
.label {
  color: $primary-invert;
}
</style>
