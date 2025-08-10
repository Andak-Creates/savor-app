"use client";

import React, { useCallback, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { storage } from "@/lib/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import CloudUpload from "@/lottiesfiles/Upload-cloud.json";
import Lottie from "lottie-react";
import Image from "next/image";

export default function FileUploader() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadURL, setUploadURL] = useState<string>("");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Accept common image/video/document MIME types — adjust as required
  const accept =
    "image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const onFile = useCallback((f: File | null) => {
    setError(null);
    if (!f) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    setFile(f);

    // show preview for images
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = e.dataTransfer.files?.[0] ?? null;
    onFile(dropped);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0] ?? null;
    onFile(chosen);
  };

  const handleUpload = async () => {
    setError(null);
    setUploadURL("");
    setProgress(null);

    if (!file) {
      setError("No file selected.");
      return;
    }
    if (!user) {
      setError("You must be signed in to upload.");
      return;
    }

    try {
      const path = `users/${user.uid}/${Date.now()}_${file.name}`;
      const fileRef = ref(storage, path);

      // Use resumable upload to get progress
      const uploadTask: UploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(pct);
        },
        (err) => {
          setError(err.message || "Upload failed.");
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadURL(url);
          setProgress(100);
        }
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Upload error");
      }
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadURL("");
    setProgress(null);
    setError(null);
  };

  return (
    <div className="w-full text-red-400 mx-auto">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="cursor-pointer block rounded-lg border-2 border-dashed md:w-[full] border-slate-300 bg-white p-6 text-center hover:border-slate-400 transition"
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChoose}
          className="hidden"
          aria-hidden
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="h-fit w-[200px]">
            <Lottie autoPlay loop animationData={CloudUpload} />
          </div>

          <p className="text-sm text-slate-600">
            <span className="font-medium">Drag and drop files here</span>, or{" "}
            <span className="text-blue-600 underline">
              click to choose from device
            </span>
          </p>

          <p className="text-xs text-slate-400">
            Accepted: images, videos, PDFs.
          </p>

          {file && (
            <div className="w-full mt-3 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* image preview */}
              {previewUrl && (
                <Image
                  fill
                  src={previewUrl}
                  alt="preview"
                  className=" mt-3 max-h-48 w-auto rounded-md object-cover border"
                />
              )}
            </div>
          )}
        </div>
      </label>

      {/* Upload controls */}
      <div className="mt-4 flex justify-center items-center gap-3 text-[13px]">
        <button
          onClick={handleUpload}
          className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-1 text-white disabled:opacity-60"
          disabled={!file}
        >
          Upload
        </button>

        <button
          onClick={clearSelection}
          className="rounded border px-3 py-1 text-sm"
          type="button"
        >
          Clear
        </button>

        {progress !== null && (
          <div className="ml-auto text-sm">
            {progress}%{" "}
            <span className="ml-2 inline-block w-36 align-middle">
              <progress value={progress} max={100} className="w-full" />
            </span>
          </div>
        )}
      </div>

      {/* results / errors */}
      {uploadURL && (
        <div className="mt-3 break-words text-sm text-green-700">
          Uploaded URL:{" "}
          <a
            href={uploadURL}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {uploadURL}
          </a>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
