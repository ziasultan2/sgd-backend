<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item prop="image_uri" style="margin-bottom: 30px;" label="Image">
            <Upload v-model="form.image_uri" />
          </el-form-item>
          <el-form-item label="Title (Lt)" prop="title_lt">
            <el-input type="text" v-model="form.title_lt" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description (Lt)" prop="description_lt">
            <tinymce v-model="form.description_lt" />
          </el-form-item>
          <el-form-item label="Title (Ru)" prop="title_ru">
            <el-input type="text" v-model="form.title_ru" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description (RU)" prop="description_ru">
            <tinymce v-model="form.description_ru" />
          </el-form-item>
          <el-form-item label="Title (En)" prop="title_en">
            <el-input type="text" v-model="form.title_en" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description (En)" prop="description_en">
            <tinymce v-model="form.description_en"/>
          </el-form-item>
          <el-form-item label="Action">
            <el-button type="primary" @click="submitForm('form')">Submit</el-button>
            <el-button @click="resetForm('form')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce';
import Upload from '@/components/Upload/SingleImage';
import request from '@/utils/request';
export default {
  components: { tinymce, Upload},
  data() {
    return {
      form: {},
      loading: true,
      id: null,
      ruleForm: {}
    }
  },
  methods: {
    submitForm() {
      request({
        url: `news`,
        method: 'post',
        data: this.form
      }).then(res => {
        this.$message({
          message: 'Success',
          type: 'success'
        });
        this.$router.push({ name: 'news' });
      }).catch(err => {
        this.$message({
          message: 'Error',
          type: 'error'
        });
      });
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    },
    handleImageSuccess(file) {
      this.emitInput(file.files.file);
    },
  }
}
</script>

<style>

</style>
