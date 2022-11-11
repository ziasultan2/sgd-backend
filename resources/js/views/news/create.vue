<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce';
export default {
  components: { tinymce },
  data() {
    return {
      additionalData: {},
    }
  },
  methods: {
    newsForm() {

    },
    resetForm() {

    },
    handleImageSuccess(file) {
      this.emitInput(file.files.file);
    },
  }
}
</script>

<style>

</style>
