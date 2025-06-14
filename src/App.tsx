import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';

interface Shirt {
  id: number;
  images: string[];
  name: string;
  sizes: string[];
}

const shirts: Shirt[] = [
  {
    id: 1,
    images: [
      'https://i.imgur.com/rnPzNlN.jpeg',
      'https://i.imgur.com/BXQASkj.jpeg',
      'https://i.imgur.com/UXJDc5J.jpeg',
      'https://i.imgur.com/BIfglEP.jpeg',
      'https://i.imgur.com/LKCr1GI.jpeg',
      'https://i.imgur.com/OtEsTZs.jpeg',
      'https://i.imgur.com/YgyLrGv.jpeg',
      'https://i.imgur.com/iVVeMtZ.jpeg',
    ],
    name: 'Camiseta Oversized "DUEL"',
    sizes: ['P', 'M', 'G', 'GG', 'XG']
  },
  {
    id: 2,
    images: [
      'https://i.imgur.com/Xl0TGA6.jpeg',
      'https://i.imgur.com/3RR6FCQ.jpeg',
      'https://i.imgur.com/gtrIXBa.jpeg',
      'https://i.imgur.com/uIXd75z.jpeg',
      'https://i.imgur.com/3nZNczm.jpeg',
      'https://i.imgur.com/Ptvuqsr.jpeg',
      'https://i.imgur.com/VXEWJUW.jpeg',
      'https://i.imgur.com/JuXW1Gc.jpeg',
    ],
    name: 'Camiseta Oversized "COLT"',
    sizes: ['P', 'M', 'G', 'GG', 'XG']
  },
  {
    id: 3,
    images: [
      'https://i.imgur.com/tYvYZk7.jpeg',
      'https://i.imgur.com/zxWEgGs.jpeg',
      'https://i.imgur.com/kjiEpWX.jpeg',
      'https://i.imgur.com/INWDxq4.jpeg',
      'https://i.imgur.com/0ZOzqkq.jpeg',
      'https://i.imgur.com/cINFnZr.jpeg',
      'https://i.imgur.com/ZNtTEZL.jpeg',
      'https://i.imgur.com/p0e8oRL.jpeg',
    ],
    name: 'Camiseta Oversized "WANTED"',
    sizes: ['P', 'M', 'G', 'GG', 'XG']
  },
];

function App() {
  const [selectedShirt, setSelectedShirt] = useState<Shirt | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleShirtClick = (shirt: Shirt) => {
    setSelectedShirt(shirt);
    setSelectedSize('');
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedShirt(null);
    setSelectedSize('');
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedShirt && currentImageIndex < selectedShirt.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleWhatsAppOrder = () => {
    if (selectedShirt && selectedSize) {
      const message = `Olá! Gostaria de fazer um pedido:\nCamiseta: ${selectedShirt.name}\nTamanho: ${selectedSize}\nCor:`;
      const whatsappUrl = `https://wa.me/5537984247606?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      window.open('https://wa.me/5537984247606?text=Olá! Gostaria de saber mais sobre as camisetas.', '_blank');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      {/* Header */}
      <header className="py-12 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/images/logobranca.png"
            alt="Logo da Marca"
            className="h-16 w-auto object-contain"
            style={{ maxHeight: '130px' }}
          />
        </div>
      </header>

      {/* Gallery */}
      <main className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {shirts.map((shirt) => (
            <div
              key={shirt.id}
              className="group cursor-pointer"
              onClick={() => handleShirtClick(shirt)}
            >
              <div className="aspect-square overflow-hidden rounded-sm" style={{ backgroundColor: '#18181b' }}>
                <img
                  src={shirt.images[0]}
                  alt={shirt.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-center font-light transition-colors duration-300 group-hover:text-white" 
                  style={{ color: '#d4d4d8' }}>
                {shirt.name}
              </h3>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedShirt && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" 
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
          <div className="max-w-2xl w-full">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
              >
                <X size={20} color="#ffffff" />
              </button>
              
              {/* Image Container with Navigation */}
              <div className="relative aspect-square overflow-hidden rounded-sm mb-6" 
                   style={{ backgroundColor: '#18181b' }}>
                <img
                  src={selectedShirt.images[currentImageIndex]}
                  alt={selectedShirt.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows - Only show if more than 1 image */}
                {selectedShirt.images.length > 1 && (
                  <>
                    {currentImageIndex > 0 && (
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
                      >
                        <ChevronLeft size={24} color="#ffffff" />
                      </button>
                    )}
                    
                    {currentImageIndex < selectedShirt.images.length - 1 && (
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
                      >
                        <ChevronRight size={24} color="#ffffff" />
                      </button>
                    )}
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {selectedShirt.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className="w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: index === currentImageIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-light mb-6 text-white">{selectedShirt.name}</h2>
                
                <div className="mb-8">
                  <p className="mb-4 font-light" style={{ color: '#a1a1aa' }}>Selecione o tamanho:</p>
                  <div className="flex justify-center gap-3 flex-wrap">
                    {selectedShirt.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-sm font-light transition-all duration-300 ${
                          selectedSize === size
                            ? 'text-black'
                            : 'text-white hover:text-white'
                        }`}
                        style={{
                          border: selectedSize === size ? '1px solid #ffffff' : '1px solid #3f3f46',
                          backgroundColor: selectedSize === size ? '#ffffff' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedSize !== size) {
                            e.currentTarget.style.borderColor = '#71717a';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedSize !== size) {
                            e.currentTarget.style.borderColor = '#3f3f46';
                          }
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSize && (
                  <button
                    onClick={handleWhatsAppOrder}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-sm font-light transition-colors duration-300"
                    style={{ backgroundColor: '#1c447a' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163659'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1c447a'}
                  >
                    <Bookmark size={18} />
                    Pré-Venda
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <button
          onClick={handleWhatsAppOrder}
          className="text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-light transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: '#1c447a' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163659'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1c447a'}
        >
          <Bookmark size={22} />
          Pré-Venda
        </button>
      </div>
    </div>
  );
}

export default App;