<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn
            small
            flat
            color="grey"
            @click="sortBy('due')"
            slot="activator"
          >
            <v-icon small left>date_range</v-icon>
            <span class="caption text-lowercase">Par date de départ</span>
          </v-btn>
          <span>Sort by project name</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 sm3 md3>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs12 sm3 md3>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <template>
            <v-flex xs6 sm1 md1>
              <div class="center">
                <v-btn icon class="mx-0" @click="editItem(project)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs6 sm1 md1>
              <div class="center">
                <v-btn icon class="mx-0" @click="deleteItem(project)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </template>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";

export default {
  data() {
    return {
      projects: []
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    editItem(project) {
      this.editedIndex = this.projects.indexOf(project);
      this.editedItem = Object.assign({}, project);
      this.dialog = true;
      console.log("Edited");
    },

    deleteItem(project) {
      const index = this.projects.indexOf(project);
      fetch("http://localhost:3000/projects/" + project.id, {
        method: "DELETE"
      });
      confirm("Êtes-vous sûr de vouloir supprimer cet agent OMP ?") &&
        this.projects.splice(index, 1);
      console.log("Deleted");
    },

    // deleteItem() {
    //   if (confirm("Are you sure you want to delete this item?")) {
    //     for (var i = 0; i < this.selected.length; i++) {
    //       const index = this.projects.indexOf(this.selected[i]);
    //       this.projects.splice(index, 1);
    //     }
    //   }
    // },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem);
      } else {
        this.projects.push(this.editedItem);
      }
      this.close();
    }
  },
  created() {
    fetch("http://localhost:3000/projects").then(projectsFromBackend => {
      const json = projectsFromBackend.json().then(json => {
        this.projects = json;
      });
    });
  }
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid #ffaa2c;
}
.project.overdue {
  border-left: 4px solid #f83e70;
}
.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.overdue {
  background: #f83e70;
}
</style>
