import { createStore } from 'vuex'
import user from "@/store/modules/user";
import token from "@/store/modules/token";
import upload from "@/store/modules/upload";
import markdown from "@/store/modules/markdown";
import dashboard from "@/store/modules/dashboard";
import notepadEvent from "@/store/modules/notepad/notepadEvent";
import notepadTheme from "@/store/modules/notepad/notepadTheme";

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
    markdown,
    dashboard,
    notepadEvent,
    notepadTheme,
  }
})
