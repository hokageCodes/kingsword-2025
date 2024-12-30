const SummerCanadaPhotos = () => {
  // Example image URLs (replace with your actual image paths)
  const images = Array.from({ length: 20 }, (_, index) => `/images/${index + 1}.png`);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Supernatural Canada Photos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
              <img
                src={img}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SummerCanadaPhotos;
