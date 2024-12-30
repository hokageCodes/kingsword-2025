import { useEffect, useState } from "react";

const ChurchPage = () => {
  const [videos, setVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const API_KEY = "AIzaSyDeXEVUILKmxEdSNAFmZiGFKhZMV8vRZDI";
  const CHANNEL_ID = "UCZuAb-Wzi75TWPgubF8evvQ";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.items);
        setFeaturedVideo(data.items[0]); // Set the first video as the featured video
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const generateShareLink = (platform, videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    switch (platform) {
      case "whatsapp":
        return `https://wa.me/?text=${encodeURIComponent(videoUrl)}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
      case "x":
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`;
      default:
        return "#";
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 mt-16 md:mt-24">
      {/* Gallery Section */}
      <div className="flex flex-col lg:flex-row items-center mb-16 md:mb-48">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Photo Gallery</h2>
          <p className="text-gray-600 mb-6">
            Relive the moments from our services and events. Browse through
            albums to see photos from past services, celebrations, and more.
          </p>
          <a
            href="https://kingswordcalgary.pic-time.com/portfolio"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            View Gallery
          </a>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center">
            <img src="/assets/recap.jpg" alt="" />
          </div>
        </div>
      </div>

      {/* Featured Video Section */}
      {featuredVideo && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Service Replay</h2>
          <div className="relative">
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideo.id.videoId}`}
              className="w-full h-96 rounded-lg"
              frameBorder="0"
              allowFullScreen
              title={featuredVideo.snippet.title}
            ></iframe>
            <div className="flex justify-between items-center mt-4">
              <a
                href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Subscribe
              </a>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Share
                </button>
                {isDropdownOpen && ( // Conditionally render dropdown
                  <div className="absolute mt-2 bg-white border rounded shadow-lg p-2 space-y-2">
                    <a
                      href={generateShareLink(
                        "whatsapp",
                        featuredVideo.id.videoId
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-700 hover:bg-gray-100 px-2 py-1"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={generateShareLink(
                        "facebook",
                        featuredVideo.id.videoId
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-700 hover:bg-gray-100 px-2 py-1"
                    >
                      Facebook
                    </a>
                    <a
                      href={generateShareLink("x", featuredVideo.id.videoId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-700 hover:bg-gray-100 px-2 py-1"
                    >
                      X
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold">
            {featuredVideo.snippet.title}
          </h2>
          <p className="text-gray-600">{featuredVideo.snippet.description}</p>
        </div>
      )}

      {/* Masonry Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos
          .filter((video) => video.id.videoId !== featuredVideo?.id.videoId)
          .map((video) => (
            <div
              key={video.id.videoId}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                className="w-full h-48"
                frameBorder="0"
                allowFullScreen
                title={video.snippet.title}
              ></iframe>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
                <p className="text-xs text-gray-500 mt-2">
                  Published:{" "}
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChurchPage;
