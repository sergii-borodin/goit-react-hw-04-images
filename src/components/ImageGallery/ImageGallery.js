import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';

import { GalleryGrid, ListItem } from './ImageGallery.styled';

const ImageGallery = ({ status, images }) => {
  if (status === 'pending') {
    return (
      <>
        <GalleryGrid>
          {images.map(image => (
            <ListItem key={image.id}>
              <ImageGalleryItem image={image} />
            </ListItem>
          ))}
        </GalleryGrid>
        <Loader />
      </>
    );
  }

  if (status === 'rejected') {
    return <p>Something went wrong</p>;
  }

  if (status === 'no matches') {
    return <p>No matches found. Try to modify your search parameters!</p>;
  }

  if (status === 'resolved') {
    return (
      <>
        <GalleryGrid>
          {images.map(image => (
            <ListItem key={image.id}>
              <ImageGalleryItem image={image} />
            </ListItem>
          ))}
        </GalleryGrid>
      </>
    );
  }
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
