'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';

const EventUploadPage = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({ title: '', subtitle: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;

    // Fetch events from Firestore
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsCollection = collection(db, 'event-uploads');
                const eventsSnapshot = await getDocs(eventsCollection);
                const eventsList = eventsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(eventsList);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Delete an event
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'event-uploads', id));
            setEvents(events.filter((event) => event.id !== id));
            alert('Event deleted successfully.');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    // Start editing an event
    const startEdit = (event) => {
        setEditingEvent(event);
        setFormData({ title: event.title, subtitle: event.subtitle });
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingEvent(null);
        setFormData({ title: '', subtitle: '' });
    };

    // Save edited event
    const handleSave = async (e) => {
        e.preventDefault();
        if (!editingEvent) return;

        try {
            const eventRef = doc(db, 'event-uploads', editingEvent.id);
            await updateDoc(eventRef, { ...formData });
            setEvents(events.map((event) => (event.id === editingEvent.id ? { ...event, ...formData } : event)));
            alert('Event updated successfully.');
            cancelEdit();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Events Manager</h1>
            {isLoading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <div>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Title</th>
                                <th className="border border-gray-300 p-2">Subtitle</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEvents.map((event) => (
                                <tr key={event.id}>
                                    <td className="border border-gray-300 p-2">{event.title}</td>
                                    <td className="border border-gray-300 p-2">{event.subtitle}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => startEdit(event)}
                                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <p>
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {editingEvent && (
                <form onSubmit={handleSave} className="mt-8 p-4 border rounded shadow bg-white">
                    <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="mt-1 block w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Subtitle</label>
                        <input
                            type="text"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            className="mt-1 block w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EventUploadPage;
