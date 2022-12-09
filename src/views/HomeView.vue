<template>
  <div>
    <NavBar />
    <div id="layoutSidenav">
      <SideBar @disconnectSocket="disconnectSocket" />
      <div id="layoutSidenav_content">
        <main>
          <div
            class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary"
          >
            <div class="container-fluid">
              <div class="page-header-content">
                <h1 class="page-header-title">
                  <div class="page-header-icon">
                    <i data-feather="file"></i>
                  </div>
                  <span>Contador</span>
                </h1>
                <div class="page-header-subtitle">
                  Contador manual de personas
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid mt-n10">
            <div class="card">
              <div class="card-header d-flex justify-content-center">
                {{ socketCounter }}
              </div>
              <div class="card-body d-flex justify-content-center">
                <button
                  class="btn btn-success"
                  @click="counterAddSub('manual-add')"
                >
                  +
                </button>
                <button
                  class="btn btn-danger ms-3"
                  @click="counterManualMod('manual-sub')"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </main>
        <footer class="footer mt-auto footer-light">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 small">
                Copyright &copy; Your Website 2020
              </div>
              <div class="col-md-6 text-md-right small">
                <a href="#!">Privacy Policy</a>
                &middot;
                <a href="#!">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import io from "socket.io-client";
import { mapActions, mapState } from "vuex";
export default {
  name: "HomeView",
  components: { NavBar, SideBar },
  data() {
    return {
      socket: {},
      socketCounter: 0,
      sio_base_url: "https://ikcount.com",
    };
  },
  created() {
    this.getUserData();
    this.connectSocket(this.getUrlSIO());
    this.socket.on("welcome", (data) => {
      console.log("bienvenido", data);
      this.socketCounter = data.occupancy;
    });
    this.socket.on("heartbeat", (data) => {
      console.log("heartbeat", data);
      this.socketCounter = data.occupancy;
    });
    this.socket.on("raw", (data) => {
      console.log("data del raw", data);
      this.socketCounter = data.occupancy;
    });
    this.socket.on("disconnect", (reason) => {
      console.log("socket desconectado", reason);
    });
  },
  mounted() {},
  computed: {
    ...mapState(["userData"]),
  },
  methods: {
    ...mapActions(["counterManualMod"]),
    counterAddSub(type_) {
      let payload = {
        url: `https://ikcount.com/iklab/ikcount/api/livecommand?atoken=${this.user_data.access_token}`,
        data: {
          type: type_,
          quantity: 1,
          client: this.userData.privileges.devices[0].client_id,
          location: this.userData.privileges.locations[0].location_id,
          macaddress: this.userData.privileges.devices[0].mac_address,
          username: this.userData.username,
          email: this.userData.email,
        },
      };
      this.counterManualMod(payload);
    },
    getUrlSIO() {
      return `${this.sio_base_url}/live?atoken=${this.user_data.access_token}`;
    },
    disconnectSocket() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    connectSocket(url) {
      this.socket = io(url);
    },
  },
};
</script>
