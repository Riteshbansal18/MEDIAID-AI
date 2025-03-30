// src/components/DocumentUploader.js
import React, { useState } from "react";
import { documentApi } from "../services/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    try {
      const response = await documentApi.uploadDocument(file);
      setExtractedText(response.data.text);
      toast.success("Document processed successfully!");
    } catch (error) {
      toast.error("Failed to process document.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upload Document</h2>
      <form onSubmit={handleFileUpload}>
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Upload and Process
        </button>
      </form>
      {extractedText && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Extracted Text:</h3>
          <p className="text-gray-600">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;