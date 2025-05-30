
import axios from 'axios';

const API_CONFIG = {
  baseURL: 'https://ytstream-download-youtube-videos.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '65560d6fd6msha21d1fb7df6c45cp165b1djsn3b50ced25f83',
    'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
  }
};

export const downloadVideo = async (videoId: string) => {
  console.log('Making API request for video ID:', videoId);
  
  const options = {
    method: 'GET',
    url: `${API_CONFIG.baseURL}/dl`,
    params: { id: videoId },
    headers: API_CONFIG.headers
  };

  try {
    const response = await axios.request(options);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Fallback to XMLHttpRequest method as provided
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          try {
            const data = JSON.parse(this.responseText);
            console.log('XMLHttpRequest Response:', data);
            resolve(data);
          } catch (parseError) {
            console.error('Parse Error:', parseError);
            reject(parseError);
          }
        }
      });

      xhr.addEventListener('error', function() {
        console.error('XMLHttpRequest Error');
        reject(new Error('Network request failed'));
      });

      xhr.open('GET', `${API_CONFIG.baseURL}/dl?id=${videoId}`);
      xhr.setRequestHeader('x-rapidapi-key', API_CONFIG.headers['x-rapidapi-key']);
      xhr.setRequestHeader('x-rapidapi-host', API_CONFIG.headers['x-rapidapi-host']);

      xhr.send(null);
    });
  }
};
