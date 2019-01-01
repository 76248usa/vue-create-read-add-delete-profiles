<template>
  <div v-if="family" class="edit-family container">
    <h2>Edit {{family.parents}} family</h2>
    <form @submit.prevent="EditFamily">
      <div class="field title">
        <label for="parents">Parents' names</label>
        <input type="text" name="parents" v-model="family.parents" required>
      </div>
      <div class="field family">
        <label for="address">Family's address</label>
        <input type="text" name="address" v-model="family.address" required>
      </div>
      <div v-for="(kind, index) in family.kids" :key="index" class="field">
        <label for="kid">Child:</label>
        <input type="text" name="kid" v-model="family.kids[index]">
        <i class="material-icons delete" @click="deleteKid(kind)">delete</i>
      </div>
      <div class="field add-kid">
        <label for="add-kids">Add child's name:</label>
        <input type="text" name="add-kids" @keydown.tab.prevent="addKid" v-model="child">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn brown lighten-3">Update Family</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditFamily",
  data() {
    return {
      family: null,
      child: null,
      feedback: null
    };
  },
  methods: {
    EditFamily() {
      if (this.family.parents) {
        this.feedback = null;
        //create a slug
        this.family.slug = slugify(this.family.parents, {
          replacement: "-",
          remove: /[$*+~.()'"!:@]/g,
          lower: true
        });
        db.collection("families")
          .doc(this.family.id)

          .update({
            parents: this.family.parents,
            address: this.family.address,
            kids: this.family.kids,
            slug: this.family.slug
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
        this.family.kids.push(this.child);
        this.child = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value";
      }
    },
    deleteKid(kind) {
      this.family.kids = this.family.kids.filter(kid => {
        return kid != kind;
      });
    }
  },
  created() {
    let ref = db
      .collection("families")
      .where("slug", "==", this.$route.params.family_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.family = doc.data();
        this.family.id = doc.id;
      });
    });
  }
};
</script>
<style>
.edit-family {
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
.edit-family .field {
  margin: 20px auto;
  position: relative;
}
.edit-family .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>


