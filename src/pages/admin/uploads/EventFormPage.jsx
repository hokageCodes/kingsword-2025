/* eslint-disable react/prop-types */
'use client';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { auth, storage, db } from '../../../../firebaseConfig';

const EventUpload = ({ section = 'event-page' }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !eventDate || (section === 'event-page' && !description)) {
      alert('Please fill in all required fields.');
      return;
    }

    const user = auth.currentUser;
    const collectionName = section === 'event-page' ? 'event-uploads' : 'other-uploads';

    try {
      setUploading(true);
      const fileRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, collectionName), {
        title,
        subtitle: section === 'event-page' ? subtitle : null,
        description: section === 'event-page' ? description : null,
        registrationLink: section === 'event-page' ? registrationLink : null,
        eventDate,
        imageUrl,
        uploadedBy: user.uid,
        timestamp: new Date(),
      });

      alert('Event uploaded successfully!');
      setTitle('');
      setSubtitle('');
      setDescription('');
      setRegistrationLink('');
      setEventDate('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading event:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow-md">
      <div>
        <label className="block text-sm font-medium">Event Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      {section === 'event-page' && (
        <>
          <div>
            <label className="block text-sm font-medium">Event Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Event Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Registration Link</label>
            <input
              type="url"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
        </>
      )}
      <div>
        <label className="block text-sm font-medium">Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Event Image</label>
        <input type="file" onChange={handleFileChange} className="mt-1 block w-full" required />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Event'}
      </button>
    </form>
  );
};

export default EventUpload;
