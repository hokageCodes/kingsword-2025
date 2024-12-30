/* eslint-disable react/prop-types */
import Sidebar from '../admin/Sidebar';
import Header from '../admin/Header';
import './layout.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
