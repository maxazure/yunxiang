<template>
  <el-upload
    class="yupload-uploader"
    :action="url"
    :on-success="handleAvatarSuccess"
    :show-file-list="type === 'file'?true:false"
  >
    <div v-if="type === 'file'" class="file">
      <el-button size="small" type="primary">点击上传</el-button>
    </div>
    <div v-if="type === 'photo'" class="photo">
      <img v-if="imageUrl" :src="imageUrl" class="yupload">
      <i v-else class="el-icon-plus yupload-uploader-icon" />
    </div>
  </el-upload>
</template>
<script>
export default {
  props: {
    url: { type: String, default: () => 'https://jsonplaceholder.typicode.com/posts/' },
    /*
         * 类型：图片上传/文件上传
         * file/photo
         */
    type: { type: String, default: () => 'file' }
  },
  data() {
    return { imageUrl: '' }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style lang="scss" >
  .yupload-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .yupload-uploader .el-upload:hover {
    border-color: #409EFF;
  }

    .yupload-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .yupload {
      width: 178px;
      height: 178px;
      display: block;
  }
</style>
