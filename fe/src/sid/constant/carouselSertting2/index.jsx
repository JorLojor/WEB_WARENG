
  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
              },
          },
          {
              breakpoint: 992,
              settings: {
                  slidesToShow: 2,
              },
          },
      ],
  };

export default settings;


