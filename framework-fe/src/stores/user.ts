import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref();
  const setUser = (val: object) => {
    user.value = val;
    const temp = JSON.stringify(val);
    localStorage.setItem('user', temp);
  };
  const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  };
  const removeUser = () => {
    localStorage.removeItem('user');
    user.value = null;
  };
  user.value = getUser();
  return { user, setUser, getUser, removeUser };
});
