'use client';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '../../../../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainEventsPageUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    eventDate: '',
    imageFile: null,
  });

  const collectionRef = collection(db, 'main-events-uploads');
  const storage = getStorage();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.eventDate || !formData.imageFile) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      // Upload image to Firebase Storage
      const imageUrl = await uploadFileToStorage(formData.imageFile);

      // Save event details to Firestore
      const newEvent = {
        title: formData.title,
        subtitle: formData.subtitle,
        eventDate: formData.eventDate,
        imageUrl, // Image URL from Firebase Storage
      };

      await addDoc(collectionRef, newEvent);
      toast.success('Event added successfully.');
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to add event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFileToStorage = async (file) => {
    const storageRef = ref(storage, `events/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const resetForm = () => {
    setFormData({ title: '', subtitle: '', eventDate: '', imageFile: null });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Supernatural Canada Events</h1>

      <form onSubmit={handleFormSubmit} className="mb-6 p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4">Add New Event</h2>
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
        <div className="mb-4">
          <label className="block text-sm font-medium">Event Date</label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Image File</label>
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={resetForm}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`py-2 px-4 ${isLoading ? 'bg-gray-500' : 'bg-green-500'} text-white rounded hover:bg-green-600`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Add Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainEventsPageUpload;
