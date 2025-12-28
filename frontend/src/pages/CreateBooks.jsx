import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async (e) => {
    e?.preventDefault(); // extra safety

    console.log('SAVE CLICKED');

    try {
      setLoading(true);

      const payload = {
        title: title.trim(),
        author: author.trim(),
        publishYear: Number(publishYear),
      };

      console.log('SENDING:', payload);

      const res = await axios.post(
        'http://localhost:5555/books',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('RESPONSE:', res.data);

      enqueueSnackbar('Book created successfully', { variant: 'success' });
      navigate('/');
    } catch (err) {
      console.error('AXIOS ERROR:', err);
      enqueueSnackbar('Error creating book', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>

      {loading && <Spinner />}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <input
          className="border-2 border-gray-500 px-4 py-2 my-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border-2 border-gray-500 px-4 py-2 my-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="border-2 border-gray-500 px-4 py-2 my-2"
          placeholder="Publish Year"
          type="number"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
        />

        <button
          type="button"
          className="p-2 bg-sky-400 m-8"
          onClick={handleSaveBook}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
