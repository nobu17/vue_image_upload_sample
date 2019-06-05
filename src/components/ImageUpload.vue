<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="upimage.fileUrl" :disabled="buttonDisabled" aspect-ratio="2" :contain="true"></v-img>
        <p>{{ upimage.fileName }}</p>
      </v-flex>
      <v-flex xs12>
        <input @change="selectedFile" type="file" accept="image/jpeg, image/jpg, image/png">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageUtil from "../lib/imageUtil";
export default {
  data() {
    return {
      isUploading: false,
      upimage: { fileUrl: "", fileName: "" }
    };
  },
  methods: {
    async selectedFile(e) {
      this.isUploading = true;

      const file = e.target.files[0];
      if (!file) {
        return;
      }
      this.upimage.fileUrl = await ImageUtil.getCompressImageAsync(file);
      this.upimage.fileName = file.name;

      this.isUploading = false;
    },
    async submit() {
      const fd = new FormData();
      const file = await ImageUtil.getFilefromDataUrl(this.upimage);
      fd.append(this.upimage.fileName, file, this.upimage.fileName);
      // do upload processing
    }
  }
};
</script>

<style>
</style>
