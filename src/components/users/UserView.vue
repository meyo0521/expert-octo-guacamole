<template>
  <div>
    <Dashboard :id="id" :profile="profile" v-if="profile" @refresh="load()" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Dashboard from '../dashboard/Dashboard';

export default {
  name: 'UsersView',
  components: { Dashboard },
  props: { id: { type: String, default: '' } },
  data() {
    return {
      profile: false,
    };
  },
  computed: {
    ...mapGetters(['isAdmin', 'event']),
  },
  watch: {
    event({ type, relate }) {
      if (type === 'users' && relate === this.id) {
        this.load();
      }
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$api('GET', `/users/${this.id}`).then((profile) => { this.profile = profile; });
    },
  },

};
</script>
<style lang="scss" scoped>
.center-avatar {
  justify-content: center;
  display: flex;
}
.avatar {
  display: flex;
  overflow: hidden;
  height: 120px;
  width: 100px;
  img {
    border-radius: 50%;
    align-self: center;
  }
}
</style>

