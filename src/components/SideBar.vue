<template>
  <div id="layoutSidenav_nav">
    <nav class="sidenav shadow-right sidenav-light">
      <div class="sidenav-menu">
        <div
          class="nav accordion sidebar justify-content-between"
          id="accordionSidenav"
        >
          <div class="sidenav-menu-heading">Sidebar</div>
          <button
            class="btn btn-primary disconect-button mx-auto mb-3"
            @click="disconnectSocket()"
          >
            Desconectar
          </button>
        </div>
      </div>
      <div class="sidenav-footer">
        <div class="sidenav-footer-content">
          <div class="sidenav-footer-subtitle">Logged in as:</div>
          <div class="sidenav-footer-title">{{ user_data.username }}</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: JSON.parse(localStorage.getItem("user_data")),
    };
  },
  methods: {
    disconnectSocket() {
      this.$emit("disconnectSocket");
    },
  },
};
</script>

<style>
.sidebar {
  height: 100%;
}
.disconect-button {
  width: fit-content;
}
</style>
