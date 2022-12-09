import { createStore } from "vuex";
import router from "../router";
import axios from "axios";

export default createStore({
  state: {
    userData: {},
  },
  getters: {},
  mutations: {
    SET_DATA(state, payload) {
      state.userData = payload;
    },
  },
  actions: {
    async userLogin({ commit }, credentials) {
      const stringTob64 = (user_name_, user_pass_) => {
        let key_ = "IKLAB005";
        let string_ = `${user_name_}:${user_pass_}:${key_}`;
        return btoa(string_);
      };
      const urlBase = "https://ikcount.com/iklab";
      let url = `${urlBase}/api/login`;
      let data = {
        auth: stringTob64(credentials.user, credentials.pass),
        privilegesDetail: true,
      };
      await axios
        .post(url, data)
        .then((res) => {
          commit("SET_DATA", res.data);
          localStorage.setItem("user_data", JSON.stringify(res.data));
          router.push("/home");
        })
        .catch((err) => {
          alert("Verifica los datos ingresados e intentalo nuevamente.");
          console.error("Error al iniciar sesión", err);
        });
    },
    // eslint-disable-next-line no-unused-vars
    async counterManualMod({ commit }, payload_) {
      console.log("payload", payload_);
      // eslint-disable-next-line no-unused-vars
      await axios.post(payload_.url, payload_.data).then((res) => {});
    },
  },
  modules: {},
});
