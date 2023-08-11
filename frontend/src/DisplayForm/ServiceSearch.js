import React, { useState } from 'react';
import axios from 'axios';

const ServiceSearch = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/service/searchservices', {
        params: {
          title,
          description,
          tags,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error retrieving services:', error);
    }
  };

  return (
    <div>
        <br/><br/>
  <form onSubmit={handleSubmit} className="mb-3">
    <div className="row bg-dark text-white p-2 mb-3">
      <div className="col">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
      </div>
      <div className="col">
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
      </div>
      <div className="col">
        <label>Tags:</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="form-control" />
      </div>
      <div className="col-auto align-self-end">
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
    </div>
  </form>

  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      {searchResults.map((service) => (
        <tr key={service._id}>
          <td>{service.title}</td>
          <td>{service.description}</td>
          <td>{service.tags.join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/>
</div>

  );
};

export default ServiceSearch;