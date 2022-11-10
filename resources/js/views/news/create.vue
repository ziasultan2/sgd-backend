<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form :model="newsForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Title" prop="title">
            <el-input type="text" v-model="newsForm.title" autocomplete="off"></el-input>
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
          <el-form-item label="Description" prop="description">
            <tinymce />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('newsForm')">Submit</el-button>
            <el-button @click="resetForm('newsForm')">Reset</el-button>
          </el-form-item>
        </el-form>
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
