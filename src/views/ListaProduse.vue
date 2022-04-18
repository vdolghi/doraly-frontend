<template>
  <div class="produse">
    <h1>Lista produse</h1>
    <ProductTable/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductTable from "@/components/ProductTable.vue";

export default {
  name: "ListaProduse",
  components: {
    ProductTable
  },
};
</script>
