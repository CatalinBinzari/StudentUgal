import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/button';

const HomeSlider = (props) => {

    const slides = [
        {   img:'/images/featured/slide18.jpg',
            lineOne:'Universitatea "Dunărea de Jos" din Galați',
            lineTwo:'Resurse IT pentru studenți',
            linkTitle:'Shop now',
            linkTo:'/shop'
        }
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }

    const generateSlides = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                        style={{
                            background:`url(${item.img})`,
                            height:`${window.innerHeight}px`
                        }} >
                        <div className="featured_action">
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
                        </div>
                    </div>
                </div>
            ))
        :null
    )
    
 

    return (
        <div className="featured_container">
            <Slider {...settings}>
                { generateSlides()}
            </Slider>
        </div>
    );
};

export default HomeSlider;