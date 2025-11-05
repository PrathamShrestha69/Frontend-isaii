import React from "react";
import { Upload, CheckCircle, Download, FileText } from "lucide-react";

const ResumeUpload = ({ uploaded, setUploaded }) => {
  const fileInputRef = React.useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setUploaded(true);
    }
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-700">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <FileText size={20} />
        Upload Resume
      </h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />

      {!uploaded ? (
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 transition-all cursor-pointer">
          <Upload size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-300 mb-2 font-medium">
            Drop your resume here or click to upload
          </p>
          <p className="text-gray-500 text-sm mb-4">PDF, DOC, DOCX (Max 5MB)</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
          >
            Select File
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={24} />
              <div>
                <p className="text-white font-semibold">Resume - V2.pdf</p>
                <p className="text-gray-400 text-sm">
                  Uploaded 2 mins ago • 1.2 MB
                </p>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 p-2 hover:bg-gray-600 rounded-lg transition-all">
              <Download size={20} />
            </button>
          </div>
          <button
            onClick={() => setUploaded(false)}
            className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all font-semibold"
          >
            Upload New Version
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;