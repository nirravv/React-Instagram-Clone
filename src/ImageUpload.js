import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username, setOpenUpload }) {
  const [image, setImage] = useState(null);
  // const [url, setUrl] = useState("");
  const [progress, setProgress] = useState("");
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Progress Logic
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error during upload...
        console.log(error);
      },
      () => {
        //Complete function..
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post images inside database..
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            setOpenUpload(false);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress
        className="imageupload__progress"
        value={progress}
        max="100"
      ></progress>

      <Input
        className="imageupload__caption"
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
      />

      <input type="file" onChange={handleChange} />
      <Button
        variant="outlined"
        className="imageupload__button"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
