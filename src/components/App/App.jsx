import { useState, useEffect } from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/SearchBar';
import Button from 'components/Button/Button';
import * as ImageService from 'service/imageService';

import { Container } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isLastPageReached, setIsLastPageReached] = useState(false);

  useEffect(() => {
    const getImages = async (query, page) => {
      if (!query) {
        return;
      }
      setStatus('pending');
      try {
        const { hits, totalHits } = await ImageService.fetchImages(query, page);

        if (hits.length === 0) {
          setStatus('no matches');
          return;
        }
        const totalPages = (totalHits / 12 + 1).toFixed();
        if (+totalPages === page) {
          setIsLastPageReached(true);
        }
        setImages(prevState => {
          console.log(prevState);
          return [...prevState, ...hits];
        });
        setStatus('resolved');
      } catch (error) {
        setError(error);
      }
    };

    getImages(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const onFormSubmit = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
    setImages([]);
    setError(null);
    setStatus('idle');
  };

  const getToNextPage = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const isButtonShown = isLastPageReached || images.length === 0;

  return (
    <Container>
      <SearchBar onFormSubmit={onFormSubmit} />
      <ImageGallery status={status} images={images} error={error} />
      {!isButtonShown && <Button onClick={getToNextPage} text={'Load More'} />}
    </Container>
  );
};
