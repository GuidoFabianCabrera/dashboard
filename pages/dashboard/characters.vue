<template>
  <div style="margin-left:56px">
    <div class="custom_container mt-10 ">
      <template>
        <v-data-table
          :headers="headers"
          :items="itemFiltered"
          sort-by="calories"
          class="elevation-1 pt-4"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <!-- <v-toolbar-title>Characters</v-toolbar-title> -->
              <v-row>
                <v-col>
                  <v-text-field
                    label="Name"
                    v-model="filteredItem.name"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Status"
                    v-model="filteredItem.status"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Species"
                    v-model="filteredItem.species"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Type"
                    v-model="filteredItem.type"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Gender"
                    v-model="filteredItem.gender"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Origin"
                    v-model="filteredItem.origin.name"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Location"
                    v-model="filteredItem.location.name"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New character
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.status"
                            label="Status"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.species"
                            label="Species"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.type"
                            label="Type"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.gender"
                            label="Gender"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.origin.name"
                            label="Origin"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.location.name"
                            label="Location"
                          ></v-text-field>
                        </v-col>
                        <!-- ----- -->
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm()"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Status", value: "status" },
      { text: "Species", value: "species" },
      { text: "Type", value: "type" },
      { text: "Gender", value: "gender" },
      { text: "Origin", value: "origin.name" },
      { text: "Location", value: "location.name" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      origin: { name: "" },
      location: { name: "" }
    },
    defaultItem: {
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      origin: { name: "" },
      location: { name: "" }
    },
    filteredItem: {
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      origin: { name: "" },
      location: { name: "" }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Character" : "Edit Item";
    },
    itemFiltered() {
      // let cloneItems = this.items.slice();
      let cloneItems = this.items.filter(item => {
        if (
          item.name
            .toLowerCase()
            .includes(this.filteredItem.name.toLowerCase()) &&
          item.status
            .toLowerCase()
            .includes(this.filteredItem.status.toLowerCase()) &&
          item.species
            .toLowerCase()
            .includes(this.filteredItem.species.toLowerCase()) &&
          item.type
            .toLowerCase()
            .includes(this.filteredItem.type.toLowerCase()) &&
          item.gender
            .toLowerCase()
            .includes(this.filteredItem.gender.toLowerCase()) &&
          item.origin.name
            .toLowerCase()
            .includes(this.filteredItem.origin.name.toLowerCase()) &&
          item.location.name
            .toLowerCase()
            .includes(this.filteredItem.location.name.toLowerCase())
        )
          return item;
        // return item.name
        //   .toLowerCase()
        //   .includes(this.filteredItem.name.toLowerCase());
      });
      // console.log(cloneItems, "hoa");
      // let cloneItems = this.items.filter(el => {
      //   if (el.name == this.filteredItem.name) return el;
      // });
      return cloneItems;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const data = await this.$repository.character.search();
        this.items = data;
      } catch (error) {
        console.log(error);
      }
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await this.$repository.character.deleteOne(
          this.items[this.editedIndex]._id
        );
        this.closeDelete();
        this.initialize();
      } catch (error) {
        console.log(error);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        try {
          const data = {
            name: this.editedItem.name,
            status: this.editedItem.status,
            species: this.editedItem.species,
            type: this.editedItem.type,
            gender: this.editedItem.gender,
            origin: {
              name: this.editedItem.origin.name,
              url: this.items[this.editedIndex].url
            },
            location: {
              name: this.editedItem.location.name,
              url: this.items[this.editedIndex].url
            },
            image: this.items[this.editedIndex].image,
            episode: this.items[this.editedIndex].episode,
            url: this.items[this.editedIndex].url
          };

          await this.$repository.character.updateOne(
            this.items[this.editedIndex]._id,
            data
          );
          this.initialize();
          this.close();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const data = {
            name: this.editedItem.name,
            status: this.editedItem.status,
            species: this.editedItem.species,
            type: this.editedItem.type,
            gender: this.editedItem.gender,
            origin: {
              name: this.editedItem.origin.name,
              url: "string"
            },
            location: {
              name: this.editedItem.location.name,
              url: "string"
            },
            image: "string",
            episode: {},
            url: "string"
          };

          await this.$repository.character.createOne(data);
          this.initialize();
          this.close();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils";
</style>
