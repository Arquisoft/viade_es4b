/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/apps.svg',
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'profile',
    icon: '/img/people.svg',
    label: 'navBar.profile',
    to: '/profile'
  },
  {
    id: 'map',
    icon: '/img/mapa.jpg',
    label: 'navBar.map',
    to: '/map'
  }
  ,
  {
    id: 'friends',
    icon: '/img/amigos.png',
    label: 'navBar.friends',
    to: '/friends'
  },
  {
    id: 'ayuda',
    icon: '/img/LogoAyuda.jpg',
    label: 'Ayuda',
    to: '/ayuda'
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
