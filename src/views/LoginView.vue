<template>
  <div class="login bg-primary">
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header justify-content-center">
                    <h3 class="font-weight-light my-4">Login</h3>
                  </div>
                  <div class="card-body">
                    <form>
                      <div class="form-group">
                        <label class="small mb-1" for="inputEmailAddress"
                          >Email</label
                        ><input
                          class="form-control py-3"
                          id="inputEmailAddress"
                          type="text"
                          placeholder="Enter email address"
                          v-model="user"
                        />
                      </div>
                      <div class="form-group">
                        <label class="small mb-1" for="inputPassword"
                          >Password</label
                        ><input
                          class="form-control py-3"
                          id="inputPassword"
                          type="password"
                          placeholder="Enter password"
                          v-model="pass"
                        />
                      </div>
                      <div
                        class="form-group d-flex align-items-center justify-content-between mt-4 mb-0"
                      >
                        <button
                          class="btn btn-primary ms-auto text-white"
                          @click.prevent="userLogin"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center">
                    <div class="small p-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      pass: "",
      api_base_url: "https://ikcount.com/iklab",
    };
  },
  methods: {
    stringTob64(user_, pass_) {
      let key_ = "IKLAB005";
      let string_ = `${user_}:${pass_}:${key_}`;
      return btoa(string_);
    },
    async userLogin() {
      let url = `${this.api_base_url}/api/login`;
      let data = {
        auth: this.stringTob64(this.user, this.pass),
        privilegesDetail: true,
      };
      console.log("url", url);
      console.log("data", data);
      await axios
        .post(url, data)
        .then((res) => {
          console.log("respuesta login", res);
          localStorage.setItem("user_data", JSON.stringify(res.data));
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          alert("Verifica los datos ingresados e intentalo nuevamente.");
          console.error("Error al iniciar sesión", err);
        });
    },
  },
};
</script>
