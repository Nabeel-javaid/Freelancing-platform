import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

export default function ServiceDecider() {
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/service/checkservice', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          toast.success(data.message);
          navigate('/service/serviceprofile');
        } else if (response.status === 335) {
          const data = await response.json();
          toast.info(data.message);
          navigate('/service/createservice');
        } else {
          toast.error('Error occurred while checking user service');
        }
      } catch (error) {
        console.log('Error occurred while checking user service:', error);
      }
    })();
  }, [ cookies.accessToken, navigate]);

  return <div>Loading...</div>;
}
