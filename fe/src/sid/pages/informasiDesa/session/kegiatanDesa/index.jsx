import { Fragment, useState, useEffect } from "react";
import Setting from '../../../../constant/carouselSertting';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GambarDummy from '../../assets/Foto.svg';
import './index.css'

const KegiatanDesa = () => {
    const [data, setData] = useState([]);

    const GetFromAPI = async () => {
        try {
            setData([
                {
                    title: 'Program Desa',
                    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
                    img: GambarDummy
                },
                {
                    title: 'Program Desa',
                    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
                    img: GambarDummy
                },
                {
                    title: 'Program Desa',
                    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
                    img: GambarDummy
                },
                {
                    title: 'Program Desa',
                    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
                    img: GambarDummy
                },
                {
                    title: 'Program Desa',
                    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
                    img: GambarDummy
                }
            ]);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        GetFromAPI();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid kegiatan-desa-container mb-0 mb-md-5" >
                <p>Kegiatan Desa</p>
                <Slider {...Setting}>
                    {data.map((item, index) => (
                        <div key={index}  >
                            <div className="card kegiatan-desa-card m-3 pb-5 mx-2" style={{borderRadius:'1vw',border : '1px solid #00917C', transition: 'transform 0.3s ease' }}>
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-10 ">
                                        <img src={item.img} alt="" style={{ height: '316px', width: '100%' }} />
                                        <div className="content">
                                            <p style={{ fontFamily: 'poppins', fontWeight: 'bold', fontSize: '20px' }}>{item.title}</p>
                                            <p style={{ fontFamily: 'poppins', fontSize: '12px', textAlign:'justify' }}>{item.detail}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    ))}
                </Slider>
            </div>
        </Fragment>
    )
}

export default KegiatanDesa;
