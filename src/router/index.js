import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import AddFamily from "@/components/AddFamily";
import EditFamily from "@/components/EditFamily";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/add-family",
      name: "AddFamily",
      component: AddFamily
    },
    {
      path: "/edit-family/:family_slug",
      name: "EditFamily",
      component: EditFamily
    }
  ]
});
