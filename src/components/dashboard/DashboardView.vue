<template>
  <Dashboard :id="id" :profile="myProfile" view="dashboard" @refresh="refreshProfile()" />
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Dashboard from './Dashboard';

export default {
  name: 'DashboardView',
  components: { Dashboard },
  computed: { ...mapGetters(['id', 'myProfile']) },
  methods: { ...mapActions(['refreshProfile']) },
};
</script>

