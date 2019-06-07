import imageCompression from "browser-image-compression";

export default {
  // アップロードされた画像ファイルのdataurlを取得
  async getCompressImageDataUrlAsync(file) {
    const options = {
      maxSizeMB: 1, // 最大ファイルサイズ
      maxWidthOrHeight: 800 // 最大画像幅もしくは高さ
    };
    try {
      // 圧縮画像の生成
      const compressedFile = await imageCompression(file, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      );
      console.log(compressedFile);
      // objectdataUrlの取得
      return imageCompression.getDataUrlFromFile(compressedFile);
    } catch (error) {
      console.error('getCompressImageAsync is error', error);
      throw error;
    }
  },
  // dataurlをfileに戻す
  async getFilefromDataUrl(dataUrl) {
    try {
      await imageCompression.getFilefromDataUrl(dataUrl);
    } catch (error) {
      console.error('getFilefromDataUrl is error', error);
      throw error;
    }
  }
};
