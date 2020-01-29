<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import axios from "../node_modules/axios";

export default {
  components: { Navbar },
  name: "App",
  data() {
    return {
      projects: []
    };
  },
  // methods: {
  //   fetchProjects() {
  //     axios.get("http://localhost:3000/projects").then(response => {
  //       console.log(response);
  //       this.projects = response.data.data;
  //     });
  //   },
  //   initialize() {
  //     this.fetchProjects();
  //   },

  //   editItem(item) {
  //     this.editedIndex = this.projects.indexOf(item);
  //     this.editedItem = Object.assign({}, item);
  //     this.dialog = true;
  //   },
  //   deleteItem(item) {
  //     console.log(item);

  //     const index = this.projects.indexOf(item);
  //     confirm("Are you sure you want to delete this item?") &&
  //       this.contacts.splice(index, 1);
  //     console.log("deleted data");
  //     axios
  //       .delete("http://localhost:3000/projects/" + item.id)
  //       .then(response => {
  //         console.log(response);
  //       });
  //   },
  //   close() {
  //     this.dialog = false;
  //     setTimeout(() => {
  //       this.editedItem = Object.assign({}, this.defaultItem);
  //       this.editedIndex = -1;
  //     }, 300);
  //   },
  //   save() {
  //     if (this.editedIndex > -1) {
  //       console.log("edited data");
  //       console.log(this.editedItem);

  //       axios
  //         .put("http://localhost:3000/projects/" + this.editedItem.id, {
  //           lastname: this.editedItem.lastname,
  //           firstname: this.editedItem.firstname,
  //           due: this.editedItem.due
  //         })
  //         .then(response => {
  //           console.log(response);
  //         });

  //       Object.assign(this.projects[this.editedIndex], this.editedItem);
  //     } else {
  //       console.log("created data");
  //       console.log(this.editedItem);
  //       axios
  //         .post("http://localhost:3000/projects", {
  //           lastname: this.editedItem.lastname,
  //           firstname: this.editedItem.firstname,
  //           due: this.editedItem.due
  //         })
  //         .then(response => {
  //           console.log(response);
  //         });
  //       this.projects.push(this.editedItem);
  //     }
  //     this.close();
  //   }
  // }
};
</script>
