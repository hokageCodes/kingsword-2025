import { useState, useEffect } from "react";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "AIzaSyDeXEVUILKmxEdSNAFmZiGFKhZMV8vRZDI";
  const CHANNEL_ID = "UCZuAb-Wzi75TWPgubF8evvQ";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideos(data.items);
          setSelectedVideo(data.items[0]); // Set the first video as the default
        } else {
          setError("No videos found.");
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setError("Error fetching YouTube videos.");
      }
    };

    fetchVideos();
  }, [API_KEY, CHANNEL_ID]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Main Video Section */}
      <div className="flex-1">
        {selectedVideo ? (
          <div className="video-player">
            <iframe
              className="w-full h-72 md:h-96 rounded shadow-lg"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              title={selectedVideo.snippet.title}
              allowFullScreen
            ></iframe>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">{selectedVideo.snippet.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(selectedVideo.snippet.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">{selectedVideo.snippet.description}</p>
            </div>
            {/* Added Section */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Support Our Channel</h3>
              <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Subscribe on YouTube
              </button>
              <h3 className="mt-6 text-lg font-semibold">Share This Video</h3>
              <div className="mt-2 flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://youtu.be/${selectedVideo.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://youtu.be/${selectedVideo.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=https://youtu.be/${selectedVideo.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Loading video...</p>
        )}
      </div>

      {/* Thumbnails List Section */}
      <div className="w-full lg:w-1/3 overflow-y-auto max-h-screen">
        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
        <div className="space-y-4">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.id.videoId}
                onClick={() => setSelectedVideo(video)}
                className={`flex items-start gap-4 cursor-pointer p-4 rounded-lg shadow hover:bg-gray-100 ${
                  selectedVideo?.id.videoId === video.id.videoId ? "bg-gray-100" : ""
                }`}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="text-md font-semibold">{video.snippet.title}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideos;
