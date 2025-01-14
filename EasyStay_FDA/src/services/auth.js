// stores/auth.js (Pinia store)
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    checkAuth() {
      // Check if the user is authenticated using your API (Sanctum, for example)
      fetch('http://127.0.0.1:8000/api/user')
        .then((response) => response.json())
        .then((data) => {
          this.isAuthenticated = !!data; // If data is truthy, the user is logged in
        })
        .catch(() => {
          this.isAuthenticated = false; // Handle error, user is not authenticated
        });
    },
  },
});
