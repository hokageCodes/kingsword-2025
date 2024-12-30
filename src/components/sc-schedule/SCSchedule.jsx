import { useState } from 'react';

const EventScheduleSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const schedule = [
    {
      day: 'Day 1',
      date: 'June 28, 2025',
      sessions: [
        {
          session: 'Morning',
          theme: 'Word Feast',
          time: '11am',
          ministers: ['Dr Kay Ijisesan', 'Pst Dotun Oragbade', 'Pastor Muyiwa Oseni'],
        },
      ],
    },
    {
      day: 'Day 2',
      date: 'June 29, 2025',
      sessions: [
        {
          session: 'Morning',
          theme: 'Celebration Service',
          time: '9:30am',
          ministers: ['Dr Kay Ijisesan', 'Pst Dotun Oragbade', 'Pastor Muyiwa Oseni'],
        },
      ],
    },
    // {
    //   day: 'Day 3',
    //   date: 'September 8, 2024',
    //   sessions: [
    //     {
    //       session: 'Morning',
    //       theme: 'Celebration Service',
    //       time: '9:30 AM',
    //       ministers: ['Dr Kay Ijisesan', 'Pst Dotun Oragbade', 'Pastor Muyiwa Oseni', 'Eben'],
    //     },
    //   ],
    // },
  ];

  return (
    <section className="px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Event Schedule</h2>

        <div className="flex flex-wrap justify-center mb-8">
          {schedule.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 mx-2 my-1 font-semibold text-base sm:text-lg border-b-4 ${
                activeTab === index
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600'
              } transition-colors duration-300`}
            >
              {day.day}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            {schedule[activeTab].day} - {schedule[activeTab].date}
          </h3>
          <ul>
            {schedule[activeTab].sessions.map((session, index) => (
              <li key={index} className="mb-4 sm:mb-6">
                <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  {session.session}
                </h4>
                <p className="text-base md:text-lg mb-1">
                  <strong>Theme:</strong> {session.theme}
                </p>
                <p className="text-base md:text-lg mb-1">
                  <strong>Time:</strong> {session.time}
                </p>
                <p className="text-base md:text-lg">
                  <strong>Ministers:</strong> {session.ministers.join(', ')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
