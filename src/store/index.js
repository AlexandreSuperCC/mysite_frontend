import { createStore } from 'vuex'
import user from "@/store/modules/user";
import token from "@/store/modules/token";
import upload from "@/store/modules/upload";
import markdown from "@/store/modules/markdown";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    token,
    user,
    upload,
    markdown
  }
})
