<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.keyword" :placeholder="$t('table.keyword')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>

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
      loading: true,
      query: {
        page: 1,
        limit: 15,
        keyword: '',
      },
      additionalData: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      request({
        url: '/pages',
        method: 'get',
        params: {
          ...this.query,
        },
      }).then((res) => {
        console.log(res.data)
        this.list = res.data;
        this.total = res.total;
        this.loading = false
      });
    },
    handleFilter() {

    },
  }
}
</script>

<style>

</style>
