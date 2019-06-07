<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <!-- 画像のプレビュー表示領域 -->
        <v-img :src="upimage.fileUrl" aspect-ratio="2" :contain="true"></v-img>
        <p>{{ upimage.fileName }}</p>
      </v-flex>
      <v-flex xs12>
        <!-- ファイルの選択 -->
        <input @change="selectedFile" type="file" accept="image/jpeg, image/jpg, image/png">
      </v-flex>
      <v-flex xs12>
        <!-- Submitボタン -->
        <v-btn color="primary" :disabled="isUploading">submit</v-btn>
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
      try {
        // 圧縮した画像を取得
        this.upimage.fileUrl = await ImageUtil.getCompressImageDataUrlAsync(
          file
        );
        this.upimage.fileName = file.name;
      } catch (err) {
        // エラーメッセージ等を表示
      } finally {
        this.isUploading = false;
      }
    },
    async submit() {
      const fd = new FormData();
      try {
        const file = await ImageUtil.getFilefromDataUrl(this.upimage);
        fd.append(this.upimage.fileName, file, this.upimage.fileName);
        // ここにサーバーへのアップロード処理を実装する
      } catch (err) {
        // エラーメッセージ等を表示
      }
    }
  }
};
</script>

<style>
</style>
