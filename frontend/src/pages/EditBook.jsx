import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5555/books/${id}`);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
      } catch (error) {
        enqueueSnackbar('Failed to fetch book', { variant: 'error' });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, enqueueSnackbar]);

  const handleEditBook = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:5555/books/${id}`, {
        title,
        author,
        publishYear,
      });

      enqueueSnackbar('Book updated successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Error updating book', { variant: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>

      {loading && <Spinner />}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <input
          className="border-2 border-gray-500 px-4 py-2 my-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border-2 border-gray-500 px-4 py-2 my-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="border-2 border-gray-500 px-4 py-2 my-2"
          type="number"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
        />

        <button
          className="p-2 bg-sky-400 text-white mt-4"
          onClick={handleEditBook}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBook;
