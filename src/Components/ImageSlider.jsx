import { useState, useEffect } from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/indiranagar.jpg';
import image3 from '../assets/JP.jpeg';
import image4 from '../assets/image2.jpg';
import image5 from '../assets/image9.jpg';
import image6 from '../assets/image10.jpg';
import '../Styles/ImageSlider.css';
import { useNavigate } from 'react-router';

function ImageSlider() {
  const images = [
    image1, image2, image3, image4, image5, image6,
  ];
  
  const[count,setCount] = useState(0);
  const [margin, setMargin] = useState('0%');

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount === images.length - 1 ? 0 : prevCount + 1;
        setMargin(`-${newCount * 100}%`);
        return newCount;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel-container">
      <div className="image-container" style={{ marginLeft: margin }}>
      {images.map((img, index) => (
          <div key={index} className={`image image-${count}`}>
            <img src={img} alt={`Slide ${count + 1}`} />
            <button className='explore' onClick={()=>navigate('/buy')}>
              EXPLORE
            </button>
          </div>
        ))}
      </div>
    </div >
  );
}

export default ImageSlider;


