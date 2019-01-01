<template>
  <div class="index container">
    <div class="card" v-for="family in families" :key="family.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteFamily(family.id)">delete</i>
        <h5>{{family.parents}}</h5>
        <p class="address">{{family.address}}</p>
        <ul class="kids">
          <li v-for="(kid, index) in family.kids" :key="index">
            <span class="chip">{{kid}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab">
        <router-link :to="{ name: 'EditFamily', params: {family_slug: family.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      families: []
    };
  },
  methods: {
    deleteFamily(id) {
      //delete doc from firestore
      db.collection("families")
        .doc(id)
        .delete()
        .then(() => {
          this.families = this.families.filter(family => {
            return family.id != id;
          });
        });
    }
  },
  created() {
    //fetch data from firestore
    db.collection("families")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let family = doc.data();
          family.id = doc.id;
          this.families.push(family);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
h5 {
  color: #c4b4b8;
  text-align: center;
  margin-top: 0;
}
.address {
  text-align: center;
  padding-top: 20px;
}
.index .kids {
  margin: 30px auto;
}
.index .kids li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  right: 4px;
  top: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
.bottomend {
  position: absolute;
  width: 100%;
  height: 100px;
  background: #f7e6ea;
  bottom: 0px;
}

p {
  color: #938488;
}
.btn {
  background: #938488;
}
.btn :hover {
  background: #c4b4b8;
}
</style>
