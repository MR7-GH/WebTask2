import React, { useState } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import ShapeCounter from './components/ShapeCounter';
import './App.css';

function App() {
  const [paintingTitle, setPaintingTitle] = useState('My Painting');
  const [canvasShapes, setCanvasShapes] = useState([]);
  const [draggedShape, setDraggedShape] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [isDraggingShape, setIsDraggingShape] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [nextId, setNextId] = useState(1);

  const handleShapeClick = (shapeType) => {
    const newShape = {
      id: nextId,
      type: shapeType,
      x: Math.random() * 400 + 50,
      y: Math.random() * 200 + 50,
      color: '#3b82f6' // default blue color
    };
    setCanvasShapes([...canvasShapes, newShape]);
    setNextId(nextId + 1);
  };

  const handleShapeDoubleClick = (shapeId) => {
    setCanvasShapes(canvasShapes.filter(shape => shape.id !== shapeId));
    if (selectedShape?.id === shapeId) {
      setSelectedShape(null);
    }
  };

  const handleDragStart = (e, shapeType) => {
    setDraggedShape(shapeType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedShape) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newShape = {
        id: nextId,
        type: draggedShape,
        x: Math.max(25, Math.min(x - 25, rect.width - 50)),
        y: Math.max(25, Math.min(y - 25, rect.height - 50)),
        color: '#3b82f6' // default blue color
      };
      
      setCanvasShapes([...canvasShapes, newShape]);
      setNextId(nextId + 1);
      setDraggedShape(null);
    }
  };

  const handleExport = () => {
    const paintingData = {
      title: paintingTitle,
      shapes: canvasShapes,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(paintingData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paintingTitle.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (paintingData) => {
    setPaintingTitle(paintingData.title);
    setCanvasShapes(paintingData.shapes);
    const maxId = Math.max(...paintingData.shapes.map(s => s.id), 0);
    setNextId(maxId + 1);
    setSelectedShape(null);
  };

  // New functions for shape interaction
  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
  };

  const handleShapeMouseDown = (e, shape) => {
    e.preventDefault();
    setSelectedShape(shape);
    setIsDraggingShape(true);
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - shape.x,
      y: e.clientY - rect.top - shape.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (isDraggingShape && selectedShape) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      setCanvasShapes(shapes => 
        shapes.map(shape => 
          shape.id === selectedShape.id
            ? { 
                ...shape, 
                x: Math.max(0, Math.min(newX, rect.width - 50)),
                y: Math.max(0, Math.min(newY, rect.height - 50))
              }
            : shape
        )
      );
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingShape(false);
  };

  const handleColorChange = (color) => {
    if (selectedShape) {
      setCanvasShapes(shapes =>
        shapes.map(shape =>
          shape.id === selectedShape.id
            ? { ...shape, color }
            : shape
        )
      );
      setSelectedShape({ ...selectedShape, color });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <Header
          paintingTitle={paintingTitle}
          setPaintingTitle={setPaintingTitle}
          onImport={handleImport}
          onExport={handleExport}
        />

        <div className="flex gap-6">
          <div className="flex-1">
            <Canvas
              canvasShapes={canvasShapes}
              selectedShape={selectedShape}
              onShapeDoubleClick={handleShapeDoubleClick}
              onShapeSelect={handleShapeSelect}
              onShapeMouseDown={handleShapeMouseDown}
              onCanvasMouseMove={handleCanvasMouseMove}
              onCanvasMouseUp={handleCanvasMouseUp}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
            <ShapeCounter canvasShapes={canvasShapes} />
          </div>

          <Sidebar
            selectedShape={selectedShape}
            onShapeClick={handleShapeClick}
            onDragStart={handleDragStart}
            onColorChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;