<template>
  <div class="projects">
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
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.firstname"
                      label="Prénom"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.due"
                      label="Date de départ"
                      :value="formattedDate"
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
  export default {
    data: () => ({
      dialog: false,
      headers: [
           { text: "Nom", value: "lastname", sortable: false },
      { text: "Prénom", value: "firstname", sortable: false },
      { text: "Date de départ", value: "due" },
      { text: "Actions", value: "id", sortable: false }
      ],
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
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
    },
    methods: {
        fetchProjects(){
             axios.get('http://localhost:3000/projects')
          .then(response=>{
              console.log(response);
              this.projects=response.data.data;
          })
      },
      initialize(){
          this.fetchProjects();
      },
      
      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        console.log(item);
        
        const index = this.projects.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.contacts.splice(index, 1)
          console.log('deleted data');
          axios.delete('http://localhost:3000/projects/'+item.id)
          .then(response=>{
            console.log(response);
            
          })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          console.log('edited data');
          console.log(this.editedItem);
          
          axios.put('http://localhost:3000/projects/'+this.editedItem.id,{lastname:this.editedItem.lastname, firstname: this.editedItem.firstname, due: this.editedItem.due})
          .then(response=>{
            console.log(response);
            
          })
          
          Object.assign(this.projects[this.editedIndex], this.editedItem)
        } else {
          console.log('created data');
          console.log(this.editedItem);
           axios.post('http://localhost:3000/projects',{lastname:this.editedItem.lastname, firstname: this.editedItem.firstname, due: this.editedItem.due})
          .then(response=>{
            console.log(response);
            
          })
          this.projects.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>