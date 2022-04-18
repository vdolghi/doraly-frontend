<template>
  <div class="produse">
    <h1>Lista produse</h1>
    <div class="container">
    <b-row class="mb-3">
      <b-col md="3">
        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          outlined
          :items="posts"
          :filter="filter"
        >
        </b-table>
      </b-col>
    </b-row>
  </div>
  </div>
</template>

<script>
export default {
  name: "ListaProduse",
  data() {
    return {
      filter: "",
      perPage: 1,
      currentPage: 1,
      posts: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        },
        {
          userId: 1,
          id: 2,
          title: "qui est esse",
        },
        {
          userId: 1,
          id: 3,
          title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        },
      ],
    };
  },
  computed: {
    rows() {
      return this.posts.length;
    },
  },
};
</script>
