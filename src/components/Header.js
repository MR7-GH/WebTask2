import React, { useState, useRef } from 'react';
import { Download, Upload, Edit3 } from 'lucide-react';

const Header = ({ paintingTitle, setPaintingTitle, onImport, onExport }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const fileInputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const paintingData = JSON.parse(event.target.result);
          if (paintingData.title && paintingData.shapes) {
            onImport(paintingData);
          } else {
            alert('Invalid file format');
          }
        } catch (error) {
          alert('Invalid JSON file format');
        }
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isEditingTitle ? (
            <input
              type="text"
              value={paintingTitle}
              onChange={(e) => setPaintingTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyPress={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              className="text-2xl font-bold bg-transparent border-b-2 border-blue-400 outline-none px-2 py-1 text-white"
              autoFocus
            />
          ) : (
            <h1 
              className="text-2xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors flex items-center gap-2"
              onClick={() => setIsEditingTitle(true)}
            >
              {paintingTitle}
              <Edit3 size={18} className="text-gray-400" />
            </h1>
          )}
        </div>
        
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Upload size={18} />
            Import
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;