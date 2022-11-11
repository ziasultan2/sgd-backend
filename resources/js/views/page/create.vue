<template>
  <div class="app-container">
    <pageForm :multiForm="page" :rules="rules"/>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce';
import pageForm from '@/components/MultiLangForm';
export default {
  components: { tinymce, pageForm },
  data() {
    return {
      additionalData: {},
      page: {},
      rules: {
        image_uri: [
          { required: true, message: 'Please upload image', trigger: 'change' }
        ],
        title_li: [
          { required: true, message: 'Please input title', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {}
}
</script>

<style>

</style>
