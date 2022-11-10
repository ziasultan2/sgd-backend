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
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
          </el-button>
          <el-button v-if="scope.row.roles.includes('visitor')" type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id, scope.row.name);">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />

    <el-dialog  :visible.sync="dialogVisible" title="Add document">
      <el-form :model="mapForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Title" prop="title">
          <el-input type="text" v-model="mapForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Image" prop="image">
          <el-upload
            :data="additionalData"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            class="image-uploader"
            drag
            action="https://httpbin.org/post"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Drag files here or <em>Click to upload</em>
            </div>
          </el-upload>
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
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      loading: false,
      dialogVisible: false,
      mapForm: {},
      additionalData: {},
      query: {
        page: 1,
        limit: 15,
        keyword: '',
        role: '',
      },
    }
  },
  methods: {
    handleFilter() {

    },
    handleCreate() {
      this.dialogVisible = true;
    },
    handleImageSuccess(file) {
      this.emitInput(file.files.file);
    },
    handleDelete() {}
  }
};
</script>

<style>

</style>
