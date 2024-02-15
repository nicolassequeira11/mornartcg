import Carousel from 'react-bootstrap/Carousel';

export const CarouselHome = ({data, extraClass, extraClassImg}) => {
  return (
    <Carousel className={`m-auto flex h-90 justify-center ${extraClass}`}>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img 
            src={item.img} 
            alt="mornarstore"  
            className={`m-auto w-100 object-cover ${extraClassImg}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export const CarouselDetails = ({ data }) => {
  return (
    <Carousel className="shadow-md">
      {data.map((item, index) => (
        <Carousel.Item key={index} className="max-md:h-[300px] h-[450px]">
          <img 
            src={item} 
            className="w-100 h-100 object-contain bg-white" 
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export const CarouselGallery = ({data, children}) => {
  return(
  <div className="flex flex-col m-auto p-auto w-11/12">
    <div className="flex max-sm:overflow-x-scroll hide-scroll-bar">
      <div className="flex flex-nowrap m-auto">
        {data.map(item => (
        <div className="inline-block">
          <div className="max-sm:w-64 max-w-xs overflow-hidden flex text-center">
            {children(item)}
          </div>
        </div>
        ))}
      </div>
    </div>
  </div>
  )
}
