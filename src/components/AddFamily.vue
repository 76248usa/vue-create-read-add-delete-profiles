<template>
  <div class="add-family container">
    <h2 class="center-align">Add New Family</h2>

    <form @submit.prevent="AddFamily">
      <div class="field title">
        <label for="parents">Parents' names</label>
        <input type="text" name="parents" v-model="parents" required>
      </div>
      <div class="field family">
        <label for="address">Family's address</label>
        <input type="text" name="address" v-model="address" required>
      </div>
      <div v-for="(kind, index) in kids" :key="index" class="field">
        <label for="kid">Child:</label>
        <input type="text" name="kid" v-model="kids[index]">
        <i class="material-icons delete" @click="deleteKid(kind)">delete</i>
      </div>
      <div class="field add-kid">
        <label for="add-kids">Add child's name:</label>
        <input type="text" name="add-kids" @keydown.tab.prevent="addKid" v-model="child">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn brown lighten-3">Add Family</button>
      </div>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddFamily",
  data() {
    return {
      parents: null,
      address: null,
      child: null,
      kids: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    AddFamily() {
      if (this.parents) {
        this.feedback = null;
        //create a slug
        this.slug = slugify(this.parents, {
          replacement: "-",
          remove: /[$*+~.()'"!:@]/g,
          lower: true
        });
        db.collection("families")
          .add({
            parents: this.parents,
            address: this.address,
            kids: this.kids,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a family";
      }
    },
    addKid() {
      if (this.child) {
        this.kids.push(this.child);
        this.child = null;
      } else {
        //this.feedback = "You must enter a value";
      }
    },
    deleteKid(kind) {
      this.kids = this.kids.filter(kid => {
        return kid != kind;
      });
    }
  }
};
</script>
<style>
.add-family {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.bottomend {
  position: absolute;
  width: 100%;
  height: 100px;
  background: #f7e6ea;
  bottom: 0px;
}
h2 {
  font-size: 2em;
  color: #938488;
  margin: 20px auto;
}
p {
  color: #938488;
}
h4 {
  font-size: 1.5em;
  color: #938488;
}
.btn {
  background: #938488;
}
.btn :hover {
  background: #f7e6ea !important;
}
.add-family .field {
  margin: 20px auto;
  position: relative;
}
.add-family .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>


