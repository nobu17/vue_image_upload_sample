<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <!-- 画像のプレビュー表示領域 -->
        <v-img :src="upimage.fileUrl" aspect-ratio="2" :contain="true"></v-img>
        <p>{{ upimage.fileName }}</p>
        <p>圧縮前サイズ(MB):{{ fileInfo.before.size }}</p>
        <p>圧縮後サイズ(MB):{{ fileInfo.after.size }}</p>
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
      upimage: { fileUrl: "", fileName: "", blob: null },
      fileInfo: {
        before: { size: 0 },
        after: { size: 0 }
      }
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
        const compFile = await ImageUtil.getCompressImageFileAsync(file);

        //ファイルサイズの表示
        this.fileInfo.before.size = (file.size / 1024 / 1024).toFixed(4);
        this.fileInfo.after.size = (compFile.size / 1024 / 1024).toFixed(4);
        // 画像情報の設定
        this.upimage.blob = compFile;
        this.upimage.fileUrl = await ImageUtil.getDataUrlFromFile(compFile);
        this.upimage.fileName = file.name;
      } catch (err) {
        // エラーメッセージ等を表示
      } finally {
        this.isUploading = false;
      }
    },
    submit() {
      const fd = new FormData();
      try {
        fd.append(this.upimage.fileName, this.upimage.blob, this.upimage.fileName);
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
