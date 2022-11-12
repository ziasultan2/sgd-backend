<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.index }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Title(Li)">
        <template slot-scope="scope">
          <span>{{ scope.row.title_lt }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Title(Ru)">
        <template slot-scope="scope">
          <span>{{ scope.row.title_ru }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Title(En)">
        <template slot-scope="scope">
          <span>{{ scope.row.title_en }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="350">
        <template slot-scope="scope">
          <router-link :to="'edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data() {
    return {
      list: null,
      total: 0,
      loading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      request({
        url: `news`,
        method: 'get'
      }).then(res => {
        console.log(res.data)
        this.list = res.data;
        this.total = res.total;
        this.loading = false;
      })
    },
  },
};
</script>

<style>

</style>
