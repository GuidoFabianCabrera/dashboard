<template>
  <div style="margin-left:56px">
    <div class="custom_container">
      <template>
        <v-data-table
          :headers="headers"
          :items="items"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Episodes</v-toolbar-title>
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
                    New episode
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row
                        ><v-col cols="12">
                          <v-text-field
                            v-model="editedItem.episode"
                            label="Episode"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.air_date"
                            label="Air date"
                          ></v-text-field>
                        </v-col>
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
      { text: "Episode", value: "episode" },
      { text: "Name", value: "name" },
      { text: "Air date", value: "air_date" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      episode: "",
      name: "",
      air_date: ""
    },
    defaultItem: {
      episode: "",
      name: "",
      air_date: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Episode" : "Edit Item";
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
        const data = await this.$repository.episode.search();
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
        await this.$repository.episode.deleteOne(
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
            air_date: this.editedItem.air_date,
            episode: this.editedItem.episode,
            characters: this.items[this.editedIndex].characters,
            url: this.items[this.editedIndex].url
          };
          await this.$repository.episode.updateOne(
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
            air_date: this.editedItem.air_date,
            episode: this.editedItem.episode,
            characters: ["string"],
            url: "string"
          };
          await this.$repository.episode.createOne(data);
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
