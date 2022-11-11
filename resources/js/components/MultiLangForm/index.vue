<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item prop="image_uri" style="margin-bottom: 30px;">
            <Upload v-model="form.image_uri" />
          </el-form-item>
          <el-form-item label="Title (Li)" prop="title_li">
            <el-input type="text" v-model="form.title_li" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description (Li)" prop="description_li">
            <tinymce v-model="form.description_li" />
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
  components: { tinymce, Upload },
  props: ['multiForm', 'rules'],
  created(){
    this.form = this.multiForm
  },
  data() {
    return {
      form: {},
      imageUrl: '',
      rules: {
        title_en: [{ required: true, trigger: 'blur', message: 'Please input title' }],
        description_en: [{ required: true, trigger: 'blur', message: 'Please input description' }],
      },
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.image = this.imageUrl
    },
    submitForm() {
      request( {url: 'pages', method :'post', data : this.form,})
        .then(response => {
          this.$message({
            type: 'success',
            message: 'Success'
          })
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: 'Error'
          })
        })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
