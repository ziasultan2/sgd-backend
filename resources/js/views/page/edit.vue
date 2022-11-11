<template>
  <div class="app-container">
    <div v-loading="loading">
      <pageForm :multiForm="page" :rules="rules"/>
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce';
import pageForm from './component/index';
import request from '@/utils/request';
export default {
  components: { tinymce, pageForm },
  data() {
    return {
      additionalData: {},
      page: {},
      loading: true,
      id: null,
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    this.id = id;
    this.getDetail()
  },
  methods: {
    getDetail() {
      console.log('id is ', this.id)
      request({
        url: '/pages/' + this.id,
        method: 'get',
      }).then((res) => {
        this.page = res.data;
        console.log('page is ', this.page)
        this.loading = false;
        this.$forceUpdate();
      });
    },
  }
}
</script>

<style>

</style>
