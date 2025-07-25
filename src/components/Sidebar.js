import React from 'react';

const Sidebar = ({ onShapeClick, onDragStart }) => {
  const shapes = [
    { type: 'circle', name: 'Circle', icon: '○' },
    { type: 'square', name: 'Square', icon: '□' },
    { type: 'triangle', name: 'Triangle', icon: '△' }
  ];

  return (
    <div className="w-64">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Tools</h2>
        <div className="space-y-4">
          {shapes.map((shape) => (
            <div
              key={shape.type}
              draggable
              onDragStart={(e) => onDragStart(e, shape.type)}
              onClick={() => onShapeClick(shape.type)}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
            >
              <div className="text-4xl mb-2 text-gray-600">
                {shape.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {shape.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            <strong>How to use:</strong><br />
            • Click shapes to add to canvas<br />
            • Drag & drop shapes to canvas<br />
            • Double-click shapes to remove<br />
            • Click title to edit it
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;