<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>
    <v-container class="my-5">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="600px">
          <v-btn flat icon slot="activator" class="success">
            <v-icon>person</v-icon>
          </v-btn>
          <v-card>
            <v-card-title>
              <h2>Ajouter un nouvel Agent OMP</h2>
            </v-card-title>

            <v-card-text>
              <v-form class="px-3" ref="form">
                <v-container>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.lastname"
                      label="Nom"
                      prepend-icon="person"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.firstname"
                      label="Prénom"
                      prepend-icon="person"
                    ></v-text-field>
                  </v-flex>
                  <v-menu v-model="menu" :close-on-content-click="false">
                    <v-text-field
                      slot="activator"
                      :value="formattedDate"
                      locale="fr-fr"
                      clearable
                      label="Date de départ"
                      prepend-icon="date_range"
                    >
                    </v-text-field>
                    <!-- <v-date-picker
                      v-model="editedItem.due"
                      @change="menu = false"
                    ></v-date-picker> -->
                    <v-date-picker
                      v-model="editedItem.due"
                      @change="menu = false"
                      :first-day-of-week="1"
                      locale="fr-fr"
                    ></v-date-picker>
                  </v-menu>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="pink mx-0 mt-3" text @click="close"
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn flat class="success mx-0 mt-3" text @click="save"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-text-field
          v-model="search"
          append-icon="search"
          label="Rechercher"
          single-line
          hide-details
          class="my-3"
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="projects"
          :search="search"
          sort-by="due"
          class="mb-3"
        >
          <template slot="items" slot-scope="props" locale="fr-fr">
            <td class="text-xs">{{ props.item.lastname }}</td>
            <td class="text-xs">{{ props.item.firstname }}</td>
            <td class="text-xs">{{ props.item.due }}</td>
            <v-spacer></v-spacer>
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="success">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </template>
    </v-container>
  </div>
</template>

<script>
import format from "date-fns/format";
import axios from "axios";

export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { text: "Nom", value: "lastname", sortable: false },
      { text: "Prénom", value: "firstname", sortable: false },
      { text: "Date de départ", value: "due" },
      { text: "Actions", value: "id", sortable: false }
    ],
    menu: false,
    projects: [],
    editedIndex: -1,
    editedItem: {
      lastname: "",
      firstname: "",
      due: ""
    },
    defaultItem: {
      lastname: "",
      firstname: "",
      due: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    formattedDate() {
      return this.editedItem.due
        ? format(this.editedItem.due, "DD MMM YYYY")
        : "";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  async created() {
    axios.get("http://localhost:3000/projects").then(response => {
      console.log(response.data);
      this.projects = response.data;
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      this.projects.forEach(project => {
        project.due = new Date(project.due).toLocaleDateString(
          "fr-FR",
          dateOptions
        );
      });
    });
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(project) {
      const index = this.projects.indexOf(project);
      confirm("Êtes-vous sûr de vouloir supprimer cet agent OMP ?") &&
        this.projects.splice(index, 1);
      console.log("Agent supprimé");
      axios
        .delete("http://localhost:3000/projects/" + project.id)
        .then(response => {
          console.log(response);
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .put("http://localhost:3000/projects/" + this.editedItem.id, {
            lastname: this.editedItem.lastname,
            firstname: this.editedItem.firstname,
            due: this.editedItem.due
          })
          .then(response => {
            console.log(response);
          });
        this.projects.push(this.editedItem);

        Object.assign(this.projects[this.editedIndex], this.editedItem);
      } else {
        console.log("created data");
        console.log(this.editedItem);
        axios
          .post("http://localhost:3000/projects", {
            lastname: this.editedItem.lastname,
            firstname: this.editedItem.firstname,
            due: this.editedItem.due
          })
          .then(response => {
            console.log(response);
          });
        this.projects.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
