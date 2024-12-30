/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "../../../firebaseConfig";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const consolidateData = (data) => data.flat();

const OverviewPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collections = [
          "connect-form",
          "contact-form",
          "volunteers",
          "worship-form",
          "group-form",
          "newsletter",
        ];

        const fetchPromises = collections.map(async (col) => {
          const querySnapshot = await getDocs(collection(db, col));
          return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });

        const eventsCollection = await getDocs(collection(db, "event-uploads"));
        const eventsData = eventsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const results = await Promise.all(fetchPromises);
        const consolidatedData = consolidateData(results);

        setData(consolidatedData);
        setEvents(eventsData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds).slice(0, 3));

        const countsMap = collections.reduce((acc, col, index) => {
          acc[col] = results[index].length;
          return acc;
        }, {});

        setCounts(countsMap);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const titles = {
    "connect-form": "Connect Form",
    "contact-form": "Contact Form",
    "volunteers": "Volunteers",
    "worship-form": "Worship Form",
    "group-form": "Group Form",
    "newsletter": "Newsletter Submissions",
  };

  const handleNavigate = (collectionName) => {
    navigate(`/admin/submissions/${collectionName}`);
  };

  const chartData = {
    labels: Object.keys(counts).map((key) => titles[key] || key),
    datasets: [
      {
        label: "Submissions",
        data: Object.values(counts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Top Section: Counts Inline */}
      {loading ? (
        <Skeleton count={1} height={40} width="100%" />
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Submission Counts</h2>
          <div className="flex flex-wrap justify-between bg-gray-100 p-4 rounded-lg">
            {Object.entries(counts).map(([collectionName, count]) => (
              <div
                key={collectionName}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleNavigate(collectionName)}
              >
                <p className="text-4xl font-bold">{count}</p>
                <p className="text-xl text-black mt-2 underline">
                  {titles[collectionName] || collectionName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Section: Left and Right Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Event Section */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Recent Events</h2>
          {events.length ? (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-start mb-4 border-b pb-4 last:border-none"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-md font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.subtitle}</p>
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm underline"
                    >
                      Register Here
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No events available.</p>
          )}
        </div>

        {/* Right: Chart Section */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Submissions Chart</h2>
          <div className="w-full h-60">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
