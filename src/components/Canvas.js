import React from 'react';

const Canvas = ({ canvasShapes, onShapeDoubleClick, onDrop, onDragOver }) => {
  const renderShape = (shape) => {
    const commonProps = {
      key: shape.id,
      onDoubleClick: () => onShapeDoubleClick(shape.id),
      style: {
        position: 'absolute',
        left: shape.x,
        top: shape.y,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      },
      className: 'hover:scale-110 hover:drop-shadow-lg'
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            {...commonProps}
            className={`${commonProps.className} w-12 h-12 border-3 border-blue-500 rounded-full bg-blue-100 hover:bg-blue-200`}
          />
        );
      case 'square':
        return (
          <div
            {...commonProps}
            className={`${commonProps.className} w-12 h-12 border-3 border-green-500 bg-green-100 hover:bg-green-200`}
          />
        );
      case 'triangle':
        return (
          <div
            {...commonProps}
            className={`${commonProps.className} w-0 h-0`}
            style={{
              ...commonProps.style,
              borderLeft: '24px solid transparent',
              borderRight: '24px solid transparent',
              borderBottom: '42px solid #ef4444',
              backgroundColor: 'transparent'
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div
        className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-400 hover:bg-blue-50"
        style={{ height: '400px' }}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-medium pointer-events-none">
          {canvasShapes.length === 0 ? 'Drag shapes here or click tools to start painting' : ''}
        </div>
        {canvasShapes.map(renderShape)}
      </div>
    </div>
  );
};

export default Canvas;