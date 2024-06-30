import React, { useState, useRef } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const UPLOAD_DELAY = 5000;

const ImageUploader = () => {
  // useRefに保存された値は更新しても再描画が発生しない
  // inputの要素を保持するためのuseRef
  // ref.currentDOMの参照がセットされて、DOMの関数などを呼び出すことができる
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  // 添付ファイルを保持するためのuseRef
  const fileRef = useRef<File | null>(null);
  const [message, setMessage] = useState<string | null>("");

  const onClickText = () => {
    if (inputImageRef.current !== null) {
      // hiddenで非表示になっているinput属性のクリックイベントを発生させることができる
      inputImageRef.current.click();
    }
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null && files.length > 0) {
      fileRef.current = files[0];
    }
  };

  const onClickUpload = async () => {
    if (fileRef.current !== null) {
      // ファイルアップロードを模して一定時間待つ
      await sleep(UPLOAD_DELAY);
      setMessage(`${fileRef.current.name} has been successfully uploaded`);
    }
  };

  return (
    <div>
      <p style={{ textDecoration: "underline" }} onClick={onClickText}>
        画像をアップロード
      </p>
      <input
        ref={inputImageRef}
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        style={{ visibility: "hidden" }}
      />
      <br />
      <button onClick={onClickUpload}>アップロードする</button>
      {message !== null && <p>{message}</p>}
    </div>
  );
};

export default ImageUploader;
