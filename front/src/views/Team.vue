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
                      v-model="editedItem.title"
                      label="Titre"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.person"
                      label="Person"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.due"
                      label="Due"
                    ></v-text-field>
                  </v-flex>
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
          sort-by="due"
          class="mb-3"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs">{{ props.item.title }}</td>
            <td class="text-xs">{{ props.item.person }}</td>
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
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { text: "Title", value: "title", sortable: false },
      { text: "Person", value: "person", sortable: false },
      { text: "Due", value: "due" },
      { text: "Actions", value: "id", sortable: false }
    ],
    projects: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      person: "",
      due: ""
    },
    defaultItem: {
      title: "",
      person: "",
      due: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();

    fetch("http://localhost:3000/projects").then(projectsFromBackend => {
      const json = projectsFromBackend.json().then(json => {
        this.projects = json;
      });
    });
  },

  methods: {
    initialize() {
      this.projects = [
        {
          title: "project.title",
          person: "project.person",
          due: "project.due"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save(project) {
      if (this.editedIndex > -1) {
        console.log("edited data");
        console.log(this.editedItem);

        //   // axios
        //   //   .put("/projects/" + this.editedItem.id, {
        //   //     title: this.editedItem.title,
        //   //     person: this.editedItem.person,
        //   //     due: this.editedItem.due
        //   //   })

        fetch("http://localhost:3000/projects/" + this.editedItem.id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({
            title: this.editedItem.title,
            person: this.editedItem.person,
            due: this.editedItem.due,
            status: this.editedItem.status,
            content: this.editedItem.content
          })
        }).then(response => {
          console.log(response);
        });
        Object.assign(this.projects[this.editedIndex], this.editedItem);
      } else {
        console.log(project);

        // const mockProject = {
        //   title: "testFront",
        //   person: "testset",
        //   due: "2012-09-09",
        //   status: "testestestset",
        //   content: "Blablabla"
        // };

        fetch("http://localhost:3000/projects", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          // body: JSON.stringify(mockProject)
          body: JSON.stringify({
            title: this.editedItem.title,
            person: this.editedItem.person,
            due: this.editedItem.due,
            status: this.editedItem.status,
            content: this.editedItem.content
          })
        }).then(response => {
          console.log(response);
        });
        this.projects.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
