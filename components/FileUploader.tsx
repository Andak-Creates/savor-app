"use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { storage } from "@/lib/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadURL, setUploadURL] = useState("");
  const { user } = useAuth();

  const handleUpload = async () => {
    if (!file || !user) return;
    const fileRef = ref(storage, `users/${user.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    setUploadURL(url);
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {uploadURL && (
        <p className="mt-4 text-green-600 break-words">
          Uploaded URL: {uploadURL}
        </p>
      )}
    </div>
  );
}
