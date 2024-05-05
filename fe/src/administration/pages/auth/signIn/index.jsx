// /* eslint-disable no-unused-vars */
// import React from 'react';
// import './SiginPage.css';
// import ButtonSignin from '../../components/buttonSignin/ButtonSigin';
// import { useState, useEffect } from 'react';


// const SiginPage = () => {

//     const [dataUser , setDataUser] = useState({
//         nama : '',
//         password : '',
//         nohp : null,
//     });

//     const updateField = (e) => {
//         setDataUser({
//             ...dataUser,
//             [e.target.name] : e.target.value
//         })
//     }
    

//     return(
//         <>
//         <div className='outer-Sigin ' style={{width: '100vw', height: '100vh'}}>
//             <div className="inner-Sigin">

//                 <div className="container-fluid box-Sigin">
                        
//                         <div className="box-Sigin-title">
//                             <h1>SIGN UP</h1>
//                             {/* input nama */}
//                             <div className="box-Sigin__title__input">
//                                 <label className='text-light' htmlFor="">Nama</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder="Masukan Nama" 
//                                     name = 'username'
//                                     onChange = {updateField}
//                                 />
//                             </div>
//                             {/* input paassword */}
//                             <div className="box-Sigin__title__input">
//                                 <label className='text-light' htmlFor="">Password</label>
//                                 <input 
//                                     type="password" 
//                                     placeholder="Masukan Password"
//                                     name = 'password'
//                                     onChange = {updateField}    
//                                 />
//                             </div>
//                             {/* input nik */}
//                             <div className="box-Sigin__title__input">
//                                 <label className='text-light' htmlFor="">Nomor Telpon</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder="Masukan Nomor Telpon"
//                                     name = 'nohp'
//                                     onChange = {updateField}    
//                                 />
//                             </div>
//                             <ButtonSignin data={dataUser}/>
//                         </div>
//                 </div>

//             </div>
//         </div>
            
//         </>
//     )
// }

// export default SiginPage;
