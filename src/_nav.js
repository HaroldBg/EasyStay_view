export default [
  {
    component: 'CNavItem',
    name: 'Tableau de bord',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavGroup',
    name: 'Chambres',
    to: '/chambre',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Chambres',
        to: '/chambre/chambres',
      },
      {
        component: 'CNavItem',
        name: 'Réservation',
        to: '/chambre/reservation',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Clients',
    to: '/clients',
    icon: 'cil-people',
  },
  {
    component: 'CNavItem',
    name: 'Employés',
    to: '/employes',
    icon: 'cil-user',
  },
  {
    component: 'CNavItem',
    name: 'Factures',
    to: '/factures',
    icon: 'cil-notes',
  },
  {
    component: 'CNavItem',
    name: 'Paramètres',
    to: '/parametre',
    icon: 'cil-settings',
  },
  {
    component: 'CNavItem',
    name: 'Hotels',
    to: '/hotels',
    icon: 'cil-settings',
  },
]
