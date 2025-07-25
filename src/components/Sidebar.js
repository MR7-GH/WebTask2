import React from 'react';

const Sidebar = ({ selectedShape, onShapeClick, onDragStart, onColorChange }) => {
  const shapes = [
    { type: 'circle', name: 'Circle', icon: '○' },
    { type: 'square', name: 'Square', icon: '□' },
    { type: 'triangle', name: 'Triangle', icon: '△' }
  ];

  const colors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // yellow
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#6b7280'  // gray
  ];

  return (
    <div className="w-64">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Tools</h2>
        <div className="space-y-4">
          {shapes.map((shape) => (
            <div
              key={shape.type}
              draggable
              onDragStart={(e) => onDragStart(e, shape.type)}
              onClick={() => onShapeClick(shape.type)}
              className="flex flex-col items-center p-4 border-2 border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
            >
              <div className="text-4xl mb-2 text-gray-300">
                {shape.icon}
              </div>
              <span className="text-sm font-medium text-gray-300">
                {shape.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Color Picker Section */}
        {selectedShape && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-sm font-bold text-white mb-3 text-center">
              Color Picker
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    selectedShape.color === color 
                      ? 'border-white shadow-lg ring-2 ring-blue-400' 
                      : 'border-gray-500 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              Selected: {selectedShape.type}
            </p>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong className="text-gray-300">How to use:</strong><br />
            • Click shapes to add to canvas<br />
            • Drag & drop shapes to canvas<br />
            • Click shapes to select them<br />
            • Drag selected shapes to move<br />
            • Double-click shapes to remove<br />
            • Select shape to change color
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;