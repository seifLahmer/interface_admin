import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import Header from '../Header/Header';
const AdminList = () => {
  const [Admins, setAdmins] = useState([]);
 

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching Admin:', error);
      }
    };

    fetchAdmin();
  }, []);

 

  return (
    <div className="centered">
      <Header />
<div>

        <h2 className="industrial-title">Liste Des Admins</h2>
        <h2></h2>
</div>
        
      
      <table>
        <thead>
          <tr>
            <th>ID admin</th>
            <th>Matricule</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {Admins.map((admin) => (
            <tr key={admin.id_admin}>
              <td>{admin.id_admin}</td>
              <td>{admin.matricule}</td>
              <td>{admin.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default AdminList;
