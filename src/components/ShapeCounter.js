import React from 'react';

const ShapeCounter = ({ canvasShapes }) => {
  const shapes = [
    { type: 'circle', icon: '○' },
    { type: 'square', icon: '□' },
    { type: 'triangle', icon: '△' }
  ];

  const getShapeCount = (shapeType) => {
    return canvasShapes.filter(shape => shape.type === shapeType).length;
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-center gap-12">
        {shapes.map((shape) => (
          <div key={shape.type} className="flex items-center gap-3">
            <span className="text-3xl text-gray-600">{shape.icon}</span>
            <span className="text-2xl font-bold text-gray-800">
              {getShapeCount(shape.type)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeCounter;