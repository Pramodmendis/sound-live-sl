import React, { useEffect, useState } from 'react';

const AdminMediaUpload = () => {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('image');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => setMedia(data));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('location', location);

    const res = await fetch('/api/portfolio/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setMedia([...media, data]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white p-8">
      <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Upload Media</h2>
      <form onSubmit={handleUpload} className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 mb-4 bg-gray-700 rounded" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-2 mb-4 bg-gray-700 rounded"></textarea>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 mb-4 bg-gray-700 rounded">
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 mb-4 bg-gray-700 rounded" />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required className="w-full p-2 mb-4 bg-gray-700 rounded" />
        <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded">Upload</button>
      </form>
      <h3 className="text-2xl font-bold text-indigo-400 mt-8 text-center">Uploaded Media</h3>
      <div className="grid md:grid-cols-3 gap-6 px-4 mt-6">
        {media.map((item) => (
          <div key={item._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold text-indigo-300">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.description}</p>
            <p className="text-sm text-gray-400 mt-1">Location: {item.location}</p>
            <p className="text-sm text-gray-400">Type: {item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMediaUpload;
