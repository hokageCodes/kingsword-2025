import { useState, useEffect } from 'react';
import OurBeliefContent from '../components/our-belief/OurBeliefContent';
import OurLeadershipContent from '../components/our-leadership/OurLeadershipContent';
import OurLocationsContent from '../components/our-locations/OurLocationsContent';

const tabData = [
  { label: 'Our Belief', content: <OurBeliefContent /> },
  { label: 'Our Leadership', content: <OurLeadershipContent /> },
  { label: 'Locations', content: <OurLocationsContent /> },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(tabData[0].label);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tabFromUrl = queryParams.get('tab');
    if (tabFromUrl && tabData.some(tab => tab.label === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else {
      setActiveTab(tabData[0].label); // Fallback to the first tab
    }
  }, []);

  const handleTabClick = (label) => {
    setActiveTab(label);
    const url = new URL(window.location);
    url.searchParams.set('tab', label); // Update the 'tab' query parameter
    window.history.pushState({}, '', url); // Push new state to history stack
  };

  return (
    <div className="w-full pt-12">
      <div className="flex text-2xl justify-around items-center bg-yellow-300 py-3 shadow-md">
        {tabData.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(tab.label)}
            className={`w-full py-2 transition-colors duration-300 ease-in-out cursor-pointer
              ${activeTab === tab.label ? 'text-black font-bold' : 'text-gray-600 hover:text-black'}
              text-base sm:text-lg md:text-xl lg:text-xl flex justify-center items-center whitespace-nowrap`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {activeTab === "Our Belief" && <OurBeliefContent />}
        {activeTab === "Our Leadership" && <OurLeadershipContent />}
        {activeTab === "Locations" && <OurLocationsContent />}
      </div>
    </div>
  );
}
