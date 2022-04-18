<template>
  <div class="product-table">
    <el-table :data="pagedTableData" stripe style="width: 70%">
      <el-table-column prop="name" sortable label="Name" width="240" />
      <el-table-column prop="price" sortable label="Price" width="120" />
      <el-table-column prop="code" sortable label="Code" width="120" />
      <el-table-column prop="weight" sortable label="Weight" width="120" />
      <el-table-column prop="color" sortable label="Color" width="120" />
      <el-table-column prop="update" label="Update" width="120">
        <template v-slot="scope">
          <el-button
            @click="handleUpdate(scope.row)"
            plain
            type="info"
            size="small"
            >Update</el-button
          >
          
        </template>
      </el-table-column>
      <el-table-column prop="delete" label="Delete" width="180">
        <template v-slot="scope">
          <el-button
            @click="handleDelete(scope.row)"
            plain
            type="danger"
            size="small"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="products.length"
      small
      background
      @current-change="setPage"
    >
    </el-pagination>
    <el-button class="mt-3" @click="handleAdd" plain type="info" size="large"
      >Add New Element</el-button
    >
    <el-dialog
      title="Add Product"
      :modelValue="addDialogVisible"
      width="50%"
      center
      close-on-click-modal="false"
      show-close="false"
    >
      <el-form size="small" label-position="left" label-width="150px">
        <el-form-item label="Name:">
          <el-input v-model="addName" width="30%" />
        </el-form-item>
        <el-form-item label="Price:">
          <el-input v-model="addPrice" width="30%" />
        </el-form-item>
        <el-form-item label="Code:">
          <el-input v-model="addCode" width="30%" />
        </el-form-item>
        <el-form-item label="Weight:">
          <el-input v-model="addWeight" width="30%" />
        </el-form-item>
        <el-form-item label="Color:">
          <el-input v-model="addColor" width="30%" />
        </el-form-item>
      </el-form>
      <span class="mt-2 pr-5">
        <el-button-group style="padding-left: 65%">
          <el-button @click="cancelAdd">Cancel</el-button>
          <el-button type="primary" @click="confirmAdd">Confirm</el-button>
        </el-button-group>
      </span>
    </el-dialog>
    <el-dialog
            title="Edit Product"
            :modelValue="editDialogVisible"
            width="50%"
            center
            close-on-click-modal="false"
            show-close="false"
            modal="false"
          >
            <el-form size="small" label-position="left" label-width="150px">
              <el-form-item label="Name:">
                <el-input v-model="editName" width="30%" />
              </el-form-item>
              <el-form-item label="Price:">
                <el-input v-model="editPrice" width="30%" />
              </el-form-item>
              <el-form-item label="Code:">
                <el-input v-model="editCode" width="30%" />
              </el-form-item>
              <el-form-item label="Weight:">
                <el-input v-model="editWeight" width="30%" />
              </el-form-item>
              <el-form-item label="Color:">
                <el-input v-model="editColor" width="30%" />
              </el-form-item>
            </el-form>
            <span class="mt-2 float-right">
              <el-button @click="cancelUpdate">Cancel</el-button>
              <el-button type="primary" @click="confirmUpdate">
                Confirm</el-button
              >
            </span>
          </el-dialog>
  </div>
</template>

<script>
import Backend from "@/api/backend";
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "ProductTable",
  data() {
    return {
      products: [],
      page: 1,
      pageSize: 10,
      addDialogVisible: false,
      addName: "",
      addPrice: null,
      addCode: "",
      addWeight: null,
      addColor: "",
      editDialogVisible: false,
      editId: null,
      editName: "",
      editPrice: null,
      editCode: "",
      editWeight: null,
      editColor: "",
    };
  },
  computed: {
    pagedTableData() {
      return this.products.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },

  methods: {
    setPage(val) {
      this.page = val;
    },

    cancelUpdate() {
      this.editDialogVisible = false;
    },

    confirmUpdate() {
      this.editDialogVisible = false;
      Backend.update(this.editId, {
        name: this.editName,
        price: this.editPrice,
        code: this.editCode,
        weight: this.editWeight,
        color: this.editColor,
      }).then(() => {
        this.$message({
          type: "success",
          message: "Product updated successfully!",
        });
        const elementId = this.products.findIndex(
          (product) => product._id === this.editId
        );
        this.products[elementId].name = this.editName;
        this.products[elementId].price = this.editPrice;
        this.products[elementId].code = this.editCode;
        this.products[elementId].weight = this.editWeight;
        this.products[elementId].color = this.editColor;
      });
    },

    handleUpdate(row) {
      this.editDialogVisible = true;
      this.editId = row._id;
      this.editName = row.name;
      this.editPrice = row.price;
      this.editCode = row.code;
      this.editWeight = row.weight;
      this.editColor = row.color;
    },

    handleAdd() {
      this.addDialogVisible = true;
    },

    cancelAdd() {
      this.addDialogVisible = false;
    },

    confirmAdd() {
      this.addDialogVisible = false;
      Backend.create({
        name: this.addName,
        price: this.addPrice,
        code: this.addCode,
        weight: this.addWeight,
        color: this.addColor,
      }).then(() => {
        this.$message({
          type: "success",
          message: "Product added successfully!",
        });
        Backend.getAll().then((response) => {
          this.products = response;
        });
      });
    },

    handleDelete(row) {
      const elementId = this.products.findIndex(
        (product) => product._id === row._id
      );
      this.products.splice(elementId, 1);
      Backend.delete(row._id).then(() => {
        this.$message({
          type: "success",
          message: "Product deleted successfully!",
        });
      });
    },
  },
  mounted() {
    Backend.getAll().then((response) => {
      this.products = response;
    });
  },
};
</script>
<style scoped>
.product-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>