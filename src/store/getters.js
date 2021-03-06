export default {
  token: state => state.token,
  isLogged: state => state.loggedIn,
  profile: state => state.profile,
  avatar: state => state.profile.avatar_url,
  id: state => state.id,
  access: state => state.access,
  isAdmin: state => state.access === 'ADMIN',
  isUser: (state, getters) => getters.isAdmin || state.access === 'USER',
  myProfile: state => state.myProfile,
  menuVisible: state => state.menuVisible,
  busy: state => state.busy,
  isMobile: state => state.mobileView,
  event: state => state.lastEvent,
  notLoggedCause: state => state.notLoggedCause,
  username: (state, getters) => {
    const { profile } = getters;
    return profile.displayName || profile.name || profile.email;
  },
};
