<template>
  <div class="navbar">
    <nav class="nav-extended #c4b4b8">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Church families</span>
        </router-link>
        <a href="#" class="btn-floating btn-large halfway-fab">
          <router-link :to="{ name: 'AddFamily' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
nav {
  background: #c4b4b8;
}
.btn-floating {
  background: #938488;
}
.btn-floating :hover {
  background: #f7e6ea;
}
.nav-title {
  color: #938488;
}
body {
  background: #e0e0e0;
}
.navbar nav {
  padding: 0 20px;
}
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>


