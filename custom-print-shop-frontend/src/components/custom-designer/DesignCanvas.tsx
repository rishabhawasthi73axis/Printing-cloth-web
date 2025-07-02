
import React, { useState, useRef } from 'react';
import { Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface DesignCanvasProps {
  selectedProduct: ProductInfo | null;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({ selectedProduct }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [designText, setDesignText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 });
  const [designScale, setDesignScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!uploadedImage && !designText) return;
    
    setIsDragging(true);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const canvas = document.getElementById('design-preview');
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    setDesignPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const saveDesign = () => {
    if (!canvasRef.current || !selectedProduct) return;
    
    // Create a message to show what would be saved in a real implementation
    const designDetails = {
      product: selectedProduct.name,
      hasCustomImage: !!uploadedImage,
      hasCustomText: !!designText,
      textColor: designText ? textColor : 'none',
      scale: designScale
    };
    
    console.log('Saving design:', designDetails);
    
    toast({
      title: "Design saved!",
      description: `Your custom design for ${selectedProduct.name} has been saved.`,
      duration: 3000,
    });
    
    // In a real app, this would save the design to the database or localStorage
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-xl font-semibold mb-4">Customize Your Design</h3>
      
      {!selectedProduct ? (
        <div className="text-center py-10 text-gray-500">
          Please select a product first
        </div>
      ) : (
        <>
          <div 
            id="design-preview"
            ref={canvasRef}
            className="relative bg-gray-100 min-h-[400px] flex items-center justify-center mb-4 rounded-md overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img 
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-h-[350px] max-w-full object-contain"
            />
            
            {uploadedImage && (
              <div 
                className="absolute"
                style={{
                  transform: `translate(${designPosition.x}px, ${designPosition.y}px) scale(${designScale})`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
              >
                <img 
                  src={uploadedImage}
                  alt="Custom design"
                  className="max-w-[150px] max-h-[150px] object-contain"
                />
              </div>
            )}
            
            {designText && (
              <div 
                className="absolute"
                style={{
                  transform: `translate(${designPosition.x}px, ${designPosition.y}px) scale(${designScale})`,
                  color: textColor,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
              >
                <p className="text-2xl font-bold">{designText}</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">Upload Image</h4>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">Click to upload or drag and drop</p>
                </div>
                <input 
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Add Text</h4>
              <input
                type="text"
                placeholder="Enter your text here"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                value={designText}
                onChange={(e) => setDesignText(e.target.value)}
              />
              <div className="flex items-center">
                <label className="mr-2">Text Color:</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 p-0 border-none"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Design Size</h4>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={designScale}
              onChange={(e) => setDesignScale(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setUploadedImage(null);
                setDesignText('');
                setDesignPosition({ x: 0, y: 0 });
                setDesignScale(1);
              }}
            >
              Reset Design
            </Button>
            <Button onClick={saveDesign}>
              <Download className="w-4 h-4 mr-2" />
              Save Design
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DesignCanvas;