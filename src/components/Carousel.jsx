import Carousel from 'react-bootstrap/Carousel';

const CarouselHome = ({img1, img2, img3, img4, img5, img6, int1, int2, data}) => {
  return (
    <Carousel className="m-auto flex justify-center">
      <Carousel.Item interval={int1}>
        <img src={img1} alt="mornarstore"  className='m-auto'/>
      </Carousel.Item>
      <Carousel.Item interval={int2}>
        <img src={img2} alt="mornarstore"  className='m-auto'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img3} alt="mornarstore"  className='m-auto'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img4} alt="mornarstore"  className='m-auto'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img5} alt="mornarstore"  className='m-auto'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img6} alt="mornarstore"  className='m-auto'/>
      </Carousel.Item>
    </Carousel>
  );
}
export {CarouselHome};

const CarouselDetails = ({ data }) => {
  return (
    <Carousel className='shadow-md'>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img src={item} className="w-100 h-100" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export {CarouselDetails};
