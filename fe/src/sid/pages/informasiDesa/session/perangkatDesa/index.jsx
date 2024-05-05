import { Fragment, useState, useEffect } from "react";
import Setting from '../../../../constant/carouselSertting2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GambarDummy from '../../assets/Foto.svg';

const PerangkatDesa = () => {
    const [data, setData] = useState([]);

    const GetFromAPI = async () => {
        try {
            setData([
                {
                    jabatan: 'Jabatan Perangkat Desa',
                    status: 'Sedang Di Kantor',
                    img: GambarDummy
                },
                {
                    jabatan: 'Jabatan Perangkat Desa',
                    status: 'Sedang Di Kantor',
                    img: GambarDummy
                },
                {
                    jabatan: 'Jabatan Perangkat Desa',
                    status: 'Sedang Di Kantor',
                    img: GambarDummy
                },
                {
                    jabatan: 'Jabatan Perangkat Desa',
                    status: 'Sedang Di Kantor',
                    img: GambarDummy
                },
                {
                    jabatan: 'Jabatan Perangkat Desa',
                    status: 'Sedang Di Kantor',
                    img: GambarDummy
                },
                {
                    jabatan: 'Jabatan Perangkat Desa',
                    status: 'Sedang Di Kantor',
                    img: GambarDummy
                },
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
            <div className="container-fluid perangkat-desa-container mb-0 mb-md-5">
                <p>Kegiatan Desa</p>
                <Slider {...Setting}>
                    {data.map((item, index) => (
                        <div key={index} style={{ borderRadius: '1vw', border: '1px solid #00917C' }}>
                            <div key={index}  >
                                <div className="card perangkat-desa-card mx-2" style={{ borderRadius: '1vw', border: '1px solid #00917C', transition: 'transform 0.3s ease', minWidth:'30vw' }} >
                                    <div className="row p-0">
                                        <div className="col-5 ms-2p-0">
                                            <img src={item.img} alt="" style={{ height: '100%', width: '100%', background:'black',objectFit:'cover',borderTopLeftRadius:'1vw', borderBottomLeftRadius:'1vw' }} />
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="content ">
                                                <p style={{ fontFamily: 'poppins', fontWeight: 'bold', fontSize: '27px' }}>Perangkat Desa</p>
                                                <p style={{ fontFamily: 'poppins', fontSize: '14px' }}>{item.jabatan}</p>
                                                <p style={{ fontFamily: 'poppins', fontWeight: 'bold',fontSize: '16px', textAlign: 'justify' }}>{item.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </Fragment>
    )
}

export default PerangkatDesa;
