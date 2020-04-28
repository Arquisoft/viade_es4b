/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/viade_es4b/img/icon/apps.svg',
    label: 'navBar.welcome',
    to: '/viade_es4b/welcome'
  },
  {
    id: 'profile',
    icon: '/viade_es4b/img/people.svg',
    label: 'navBar.profile',
    to: '/viade_es4b/profile'
  },
  {
    id: 'map',
    icon: '/viade_es4b/img/mapa.jpg',
    label: 'navBar.map',
    to: '/viade_es4b/map'
  }
  ,
  {
    id: 'friends',
    icon: '/viade_es4b/img/amigos.png',
    label: 'navBar.friends',
    to: '/viade_es4b/friends'
  },
  
  {
    id: 'ayuda',
    icon: '/viade_es4b/img/LogoAyuda.jpg',
    label: 'Ayuda',
    to: '/viade_es4b/ayuda'
  }
];

export const ProfileOptions = [
  

  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
