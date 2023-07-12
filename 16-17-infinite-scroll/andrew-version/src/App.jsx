import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import parseLinkHeader from './parseLinkHeader';

const LIMIT = 10;
const PAGE = 1;

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const nextPhotoUrlRef = useRef();

  async function getImages(url, { overwrite = false } = {}) {
    console.log(overwrite);
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      console.log(res);

      nextPhotoUrlRef.current = parseLinkHeader(res.headers.get('link')).next;
      console.log(nextPhotoUrlRef);
      const images = res.data;

      if (overwrite) {
        setImages(images);
      } else {
        setImages((prevImages) => {
          return [...prevImages, ...images];
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const imageRef = useCallback((image) => {
    if (image == null || nextPhotoUrlRef.current == null) return;
    const observer = new IntersectionObserver((entries) => {
      console.log('In intersecting');
      if (entries[0].isIntersecting) {
        getImages(nextPhotoUrlRef.current);
        observer.unobserve(image);
      }
    });

    observer.observe(image);
  }, []);

  useEffect(() => {
    getImages(
      `http://localhost:3000/photos-short-list?_page=${PAGE}&_limit=${LIMIT}`,
      {
        overwrite: true,
      }
    );
  }, []);

  return (
    <>
      <div className='grid'>
        {images.map((image, index) => {
          return (
            <img
              key={image.id}
              src={image.thumbnailUrl}
              ref={index === images.length - 1 ? imageRef : undefined}
            />
          );
        })}

        {isLoading &&
          Array.from({ length: LIMIT }, (_, index) => index).map((n) => {
            return (
              <div key={n} className='skeleton'>
                Loading...
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
