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

      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="File">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id, scope.row.name);">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />

    <el-dialog  :visible.sync="dialogVisible" title="Add document">
      <el-form :model="mapForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Name" prop="name">
          <el-input type="text" v-model="mapForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="image" style="margin-bottom: 30px;">
          <Upload v-model="mapForm.image" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('newsForm')">Submit</el-button>
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
import Upload from '@/components/Upload/SingleImage';
export default {
  components: { Pagination, Upload },
  directives: { waves },
  data() {
    return {
      list: null,
      loading: false,
      dialogVisible: false,
      mapForm: {},
      additionalData: {},
      image_uri: '',
      total: 0,
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
        url: 'documents',
        method: 'get',
        params: this.query
      }).then(res => {
        this.list = res.data;
        this.total = res.total;
        this.loading = false;
      })
    },
    handleFilter() {

    },
    handleCreate() {
      this.dialogVisible = true;
    },
    handleImageSuccess(file) {
      this.emitInput(file.files.file);
    },
    handleDelete() {},
    submitForm() {
      request({
        url: 'documents',
        method: 'post',
        data: this.mapForm
      }).then(res => {
        this.$message({
          message: 'Add document success',
          type: 'success'
        });
        this.dialogVisible = false;
        this.getList();
      })
    }
  }
};
</script>

<style>

</style>
