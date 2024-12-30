// components/Sidebar.tsx
import { useState } from 'react';
import { FaHome, FaFileAlt, FaUpload, FaSignOutAlt, FaChevronDown, FaChevronUp, FaList, FaUser, FaStar } from 'react-icons/fa';

const Sidebar = () => {
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showUploads, setShowUploads] = useState(false);

  return (
    <div className="bg-black text-white flex flex-col h-[100vh] shadow-lg w-64">
      <div className="flex items-center p-4 bg-black">
        <div className="text-xl text-white font-bold">KingsWord Canada</div>
      </div>

      <nav className="flex-1 mt-24">
        <ul>
          <li>
            <div>
              <a href="/admin" className="flex items-center p-4 hover:bg-white hover:text-black">
                <FaHome className="mr-3" />
                Dashboard
              </a>
            </div>
          </li>

          <li>
            <button
              onClick={() => setShowSubmissions(!showSubmissions)}
              className="flex items-center p-4 w-full text-left hover:bg-white hover:text-black"
            >
              <FaFileAlt className="mr-3" />
              <a href="/admin/submissions">Submissions</a>
              {showSubmissions ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
            </button>
            {showSubmissions && (
              <ul className="pl-8 mt-2">
                <li>
                  <div>
                    <a href="/admin/submissions/connect-form" className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaList className="mr-3" />
                      Connect Form
                    </a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="/admin/submissions/contact-form" className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaUser className="mr-3" />
                      Contact Form
                    </a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="/admin/submissions/group-form" className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaUser className="mr-3" />
                      Group Form
                    </a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="/admin/submissions/newsletter" className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaUser className="mr-3" />
                      Newsletter
                    </a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="/admin/submissions/volunteers" className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaStar className="mr-3" />
                      Volunteers
                    </a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="/admin/submissions/worship-form" className="flex items-center p-4 hover:bg-white hover:text-black">
                      <FaList className="mr-3" />
                      Worship Form
                    </a>
                  </div>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => setShowUploads(!showUploads)}
              className="flex items-center p-4 w-full text-left hover:bg-black hover:text-white"
            >
              <FaUpload className="mr-3" />
              <a href="/admin/uploads">Uploads</a>
              {showUploads ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
            </button>
            {showUploads && (
              <ul className="pl-8 mt-2">
                <li>
                  <div>
                    <a href="/admin/uploads/events-upload" className="flex items-center p-4 hover:bg-gray-600">
                      <FaList className="mr-3" />
                      Events Upload
                    </a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="/admin/uploads/events-display" className="flex items-center p-4 hover:bg-gray-600">
                      <FaList className="mr-3" />
                      Events Display
                    </a>
                  </div>
                </li>
                {/* <li>
                  <div>
                    <a href="/admin/uploads/main-events-upload" className="flex items-center p-4 hover:bg-gray-600">
                      <FaList className="mr-3" />
                      Main Events Upload
                    </a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="/admin/uploads/main-events-display" className="flex items-center p-4 hover:bg-gray-600">
                      <FaList className="mr-3" />
                      Main Events Display
                    </a>
                  </div>
                </li> */}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="p-4 mt-auto bg-black text-white">
        <div>
          <a href="/admin-login" className="flex items-center p-4 hover:bg-gray-700 w-full">
            <FaSignOutAlt className="mr-3" />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
