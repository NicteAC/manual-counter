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
                          @click.prevent="Login()"
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
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      pass: "",
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    Login() {
      let credentials = {
        user: this.user,
        pass: this.pass,
      };
      this.userLogin(credentials);
    },
  },
};
</script>
