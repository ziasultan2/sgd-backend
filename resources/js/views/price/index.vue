<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form :model="newsForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Name" prop="name">
            <el-input type="text" v-model="newsForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input type="text" v-model="newsForm.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>

          <el-form-item label="Name" prop="name">
            <el-input type="text" v-model="newsForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input type="text" v-model="newsForm.price" autocomplete="off"></el-input>
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
