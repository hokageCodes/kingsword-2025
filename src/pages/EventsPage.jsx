import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const db = getFirestore(app);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsCollection = collection(db, "event-uploads");
                const eventSnapshot = await getDocs(eventsCollection);
                const eventData = eventSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                const sortedEvents = [
                    ...eventData.filter((event) => event.title === "Supernatural Canada"),
                    ...eventData.filter((event) => event.title !== "Supernatural Canada"),
                ];

                setEvents(sortedEvents);
            } catch (error) {
                console.error("Error fetching events: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [db]);

    const filteredEvents = events.filter((event) => {
        const title = event.title?.toLowerCase() || "";
        const description = event.description?.toLowerCase() || "";
        const date = event.date?.toLowerCase() || "";

        return (
            title.includes(searchQuery.toLowerCase()) ||
            description.includes(searchQuery.toLowerCase()) ||
            date.includes(searchQuery.toLowerCase())
        );
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="bg-gray-50">
            {/* Banner Section */}
            <div
                className="relative bg-cover bg-center h-[250px] bg-black"
                style={{
                    backgroundImage: `url('https://your-bg-image-url.com')`, // Replace with your banner image URL
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center">
                        Our Events
                    </h1>
                </div>
            </div>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <form onSubmit={handleSearch} className="flex items-center bg-white shadow-lg rounded-lg p-4">
                    <input
                        type="text"
                        placeholder="Search events by title, date, or description"
                        className="flex-grow text-lg px-4 py-3 border-none focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Events Section */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {loading ? (
                    <div className="text-center text-gray-500 col-span-full py-20">
                        <h2 className="text-2xl font-bold mb-4">Loading events...</h2>
                        <p>Fetching the latest events for you, please wait.</p>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                        >
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 truncate">{event.title}</h3>
                                <p className="mt-2 text-gray-600 text-sm italic truncate">{event.subtitle}</p>
                                <p className="mt-4 text-gray-700 text-sm line-clamp-3">{event.description}</p>
                                <a
                                    href={event.registrationLink}
                                    className="block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-green-700 transition"
                                >
                                    Register Now
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 col-span-full py-20">
                        <h2 className="text-2xl font-bold mb-4">No events found</h2>
                        <p>Try searching for a different event or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
