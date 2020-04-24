/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/apps.svg',
    label: 'navBar.welcome',
    to: '/viade_es4b/welcome'
  },
  {
    id: 'profile',
    icon: '/img/people.svg',
    label: 'navBar.profile',
    to: '/viade_es4b/profile'
  },
  {
    id: 'map',
    icon: '/img/mapa.jpg',
    label: 'navBar.map',
    to: '/viade_es4b/map'
  }
  ,
  {
    id: 'friends',
    icon: '/img/amigos.png',
    label: 'navBar.friends',
    to: '/viade_es4b/friends'
  },
  {
    id: 'ayuda',
    icon: '/img/LogoAyuda.jpg',
    label: 'Ayuda',
    to: '/viade_es4b/ayuda'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },

  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
