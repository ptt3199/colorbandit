"use client";
import { useState, useRef, useEffect } from 'react';
import { transferImageAPI } from '../api/imageTransfer';
import Image from 'next/image';


export default function Upload() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [remainingAttempts] = useState(3); // This will come from API later
  const [isProcessing, setIsProcessing] = useState(false);

  // File input refs
  const originalInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

  // Image states
  const [originalImage, setOriginalImage] = useState<string>('');
  const [referenceImage, setReferenceImage] = useState<string>('');
  const [resultImage, setResultImage] = useState<string>('');
  const [originalFile, setOriginalFile] = useState<File|null>(null);
  const [referenceFile, setReferenceFile] = useState<File|null>(null);

  // Handle file selection
  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (url: string) => void,
    setFile: (file: File | null) => void,
    isOriginal = false
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setFile(file);
      if (isOriginal) {
        setResultImage(url);
      }
    } else {
      setFile(null);
    }
  };

  // Handle image processing
  const handleProcessImages = async () => {
    if (!originalFile || !referenceFile) {
      alert('Vui lòng chọn đủ ảnh gốc và ảnh tham chiếu');
      return;
    }
    try {
      setIsProcessing(true);
      const resultUrl = await transferImageAPI(originalFile, referenceFile);
      setResultImage(resultUrl);
      document.querySelector('.snap-start:last-child')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error processing images:', error);
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.');
      setResultImage(originalImage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Cleanup object URLs on unmount
  const cleanupObjectURL = (url: string) => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      cleanupObjectURL(originalImage);
      cleanupObjectURL(referenceImage);
      cleanupObjectURL(resultImage);
    };
  }, [originalImage, referenceImage, resultImage]);

  return (
    <div className="bg-gray-50 h-screen overflow-y-auto snap-y snap-mandatory">
      {/* First page - Upload section */}
      <div className="min-h-screen flex flex-col p-4 md:p-8 snap-start">
        <h1 className="text-3xl font-bold text-center mb-4">Chỉnh sửa ảnh</h1>
        
        {/* Attempts counter */}
        <div className="text-center mb-4 text-gray-600">
          Số lần còn lại: {remainingAttempts}/3
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Images container */}
          <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 max-w-6xl mx-auto w-full">
            {/* Original image */}
            <div className="flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center">Ảnh gốc</h2>
              <div className="flex-1 bg-white p-4 md:p-6 rounded-lg shadow-sm flex flex-col">
                <div 
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center group relative"
                  onClick={() => !originalImage && originalInputRef.current?.click()}
                  style={{ cursor: originalImage ? 'default' : 'pointer' }}
                >
                  <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center bg-gray-50">
                    {originalImage ? (
                      <>
                        <Image
                          src={originalImage}
                          alt="Original"
                          fill
                          className="object-contain"
                        />
                        <button 
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOriginalImage('');
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p className="mt-2 text-sm">Chọn ảnh gốc</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={originalInputRef}
                    onChange={(e) => handleFileSelect(e, setOriginalImage, setOriginalFile, true)}
                  />
                  {!originalImage && (
                    <button 
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        originalInputRef.current?.click();
                      }}
                    >
                      Tải ảnh lên
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Reference image */}
            <div className="flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center">Ảnh tham chiếu màu</h2>
              <div className="flex-1 bg-white p-4 md:p-6 rounded-lg shadow-sm flex flex-col">
                <div 
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center group relative"
                  onClick={() => !referenceImage && referenceInputRef.current?.click()}
                  style={{ cursor: referenceImage ? 'default' : 'pointer' }}
                >
                  <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center bg-gray-50">
                    {referenceImage ? (
                      <>
                        <Image
                          src={referenceImage}
                          alt="Reference"
                          fill
                          className="object-contain"
                        />
                        <button 
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReferenceImage('');
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                        </svg>
                        <p className="mt-2 text-sm">Chọn ảnh tham chiếu màu</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={referenceInputRef}
                    onChange={(e) => handleFileSelect(e, setReferenceImage, setReferenceFile, setReferenceFile)}
                  />
                  {!referenceImage && (
                    <button 
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        referenceInputRef.current?.click();
                      }}
                    >
                      Tải ảnh lên
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Process button */}
          <div className="flex gap-6 justify-center w-full">
            <button 
              className={`px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-semibold flex items-center justify-center gap-2 max-w-xs mx-auto ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleProcessImages}
              disabled={isProcessing || !originalImage || !referenceImage}
            >
              <span className="flex items-center justify-center">
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : 'Xử lý ảnh'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Second page - Result section */}
      <div className="min-h-screen flex flex-col p-4 md:p-8 snap-start">
        <h2 className="text-3xl font-bold text-center mb-8">Kết quả</h2>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-[800px] aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {originalImage && resultImage ? (
              <>
                {/* Original image fixed to left */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={originalImage}
                    alt="Original"
                    fill
                    className="object-contain"
                    style={{
                      clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                    }}
                  />
                </div>

                {/* Result image fixed to right */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={resultImage}
                    alt="Result"
                    fill
                    className="object-contain"
                    style={{
                      clipPath: `inset(0 0 0 ${sliderPosition}%)`
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="mt-4 text-lg">Tải lên ảnh để xem kết quả</p>
                </div>
              </div>
            )}

            {/* Slider handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>

            {/* Slider input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
