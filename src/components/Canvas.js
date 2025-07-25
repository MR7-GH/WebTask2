import React from 'react';

const Canvas = ({ 
  canvasShapes, 
  selectedShape, 
  onShapeDoubleClick, 
  onShapeSelect, 
  onShapeMouseDown, 
  onCanvasMouseMove, 
  onCanvasMouseUp, 
  onDrop, 
  onDragOver 
}) => {
  const renderShape = (shape) => {
    const isSelected = selectedShape?.id === shape.id;
    const commonProps = {
      key: shape.id,
      onDoubleClick: () => onShapeDoubleClick(shape.id),
      onClick: () => onShapeSelect(shape),
      onMouseDown: (e) => onShapeMouseDown(e, shape),
      style: {
        position: 'absolute',
        left: shape.x,
        top: shape.y,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        filter: isSelected ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))' : ''
      },
      className: `hover:scale-110 hover:drop-shadow-lg ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent' : ''}`
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            {...commonProps}
            className={`${commonProps.className} w-12 h-12 border-3 rounded-full`}
            style={{
              ...commonProps.style,
              borderColor: shape.color || '#3b82f6',
              backgroundColor: `${shape.color || '#3b82f6'}20`
            }}
          />
        );
      case 'square':
        return (
          <div
            {...commonProps}
            className={`${commonProps.className} w-12 h-12 border-3`}
            style={{
              ...commonProps.style,
              borderColor: shape.color || '#3b82f6',
              backgroundColor: `${shape.color || '#3b82f6'}20`
            }}
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
              borderBottom: `42px solid ${shape.color || '#3b82f6'}`,
              backgroundColor: 'transparent'
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
      <div
        className="relative bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-400 hover:bg-gray-600"
        style={{ height: '400px' }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onMouseMove={onCanvasMouseMove}
        onMouseUp={onCanvasMouseUp}
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