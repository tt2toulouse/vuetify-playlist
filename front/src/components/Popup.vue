<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add New Project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Ajouter un nouvel agent OMP</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            v-model="title"
            label="Title"
            prepend-icon="folder"
            :rules="inputRules"
          ></v-text-field>
          <v-text-field
            v-model="person"
            label="Person"
            prepend-icon="person"
            :rules="inputRules"
          ></v-text-field>

          <v-menu v-model="menu" :close-on-content-click="false">
            <v-text-field
              slot="activator"
              :rules="inputRules"
              :value="formattedDate"
              locale="fr"
              clearable
              label="Due date"
              prepend-icon="date_range"
            >
            </v-text-field>
            <v-date-picker v-model="due" @change="menu = false"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>

          <v-btn
            flat
            @click="submit"
            class="success mx-0 mt-3"
            :loading="loading"
            >Add Project</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import db from "@/fb";

export default {
  data() {
    return {
      title: "",
      person: "",
      due: null,
      menu: false,
      inputRules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Minimum length is 3 characters"
      ],
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          title: this.title,
          person: this.person,
          due: format(this.due, "Do MMM YYYY")
        };
      }
      fetch("http://localhost:3000/projects", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        // body: JSON.stringify(mockProject)
        body: JSON.stringify({
          title: this.title,
          person: this.person,
          due: this.due,
          status: this.status,
          content: this.content
        })
      });
    }
  },
  computed: {
    formattedDate() {
      console.log(this.due);
      return this.due ? format(this.due, "Do MMMM YYYY") : "";
    }
  },

  created() {}
};
</script>
