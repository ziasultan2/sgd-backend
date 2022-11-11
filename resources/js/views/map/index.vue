<template>
  <div class="app-container">
     <div class="filter-container">
      <el-input v-model="query.keyword" :placeholder="$t('table.keyword')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.index }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.title_lt }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Address">
        <template slot-scope="scope">
          <span>{{ scope.row.address_lt }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Lat">
        <template slot-scope="scope">
          <span>{{ scope.row.lat }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Lng">
        <template slot-scope="scope">
          <span>{{ scope.row.lng }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Photo">
        <template slot-scope="scope">
          <span>{{ scope.row.lng }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">
              Edit
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id);">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />

    <el-dialog  :visible.sync="dialogVisible" title="Add map">
      <el-form :model="mapForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Title" prop="title_lt">
          <el-input type="text" v-model="mapForm.title_lt" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address_lt">
          <el-input type="text" v-model="mapForm.address_lt" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Title" prop="title_ru">
          <el-input type="text" v-model="mapForm.title_ru" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address_ru">
          <el-input type="text" v-model="mapForm.address_ru" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Title" prop="title_en">
          <el-input type="text" v-model="mapForm.title_en" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address_en">
          <el-input type="text" v-model="mapForm.address_en" autocomplete="off"></el-input>
        </el-form-item>
       <el-row>
        <el-col :span="10">
           <el-form-item label="Lat" prop="lat">
          <el-input type="text" v-model="mapForm.lat" autocomplete="off"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Lng" prop="lng">
            <el-input type="text" v-model="mapForm.lng" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
       </el-row>
        <el-form-item>
          <el-button v-if="mode == 'create'" type="primary" @click="submitForm('newsForm')">Submit</el-button>
          <el-button v-else type="primary" @click="updateMap()">Submit</el-button>
          <el-button @click="resetForm('newsForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import Pagination from '@/components/Pagination';
import waves from '@/directive/waves'; // Waves directive
import request from '@/utils/request';
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      loading: false,
      dialogVisible: false,
      mapForm: {},
      total: 0,
      mode: 'create',
      query: {
        page: 1,
        limit: 15,
        keyword: '',
        role: '',
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      request({
        url: '/maps',
        method: 'get',
        params: this.query,
      }).then(res => {
        this.loading = false;
        this.list = res.data;
        this.total = res.total;
      });
    },
    handleFilter() {
      this.getList();
    },
    submitForm() {
      request({
        url: 'maps',
        method: 'post',
        data: this.mapForm
      }).then(res => {
        this.$message({
          message: 'Add map success',
          type: 'success'
        });
        this.dialogVisible = false;
        this.getList();
      })
    },
    handleCreate() {
      this.dialogVisible = true;
    },
    handleEdit(data) {
      this.dialogVisible = true;
      this.mode = 'edit';
      this.mapForm = data;
    },
    updateMap() {
      request({
        url: 'maps/' + this.mapForm.id,
        method: 'put',
        data: this.mapForm
      }).then(res => {
        this.$message({
          message: 'Update map success',
          type: 'success'
        });
        this.dialogVisible = false;
        this.getList();
      })
    },
    handleDelete(id) {
      this.$confirm('Are you sure to delete this map?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        request({
          url: `maps/${id}`,
          method: 'delete',
        }).then(res => {
          this.$message({
            message: 'Delete map success',
            type: 'success'
          });
          this.getList();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    }
  }
};
</script>

<style>

</style>
