// /* eslint-disable no-unused-vars */
// import {PropTypes} from 'prop-types';
// import axios from 'axios';

// const ButtonForgotPass = ({ data }) => {
//     const dataUser = {
//         nik: data.nik,
//         newPassword: data.password1,
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const comparePassword = data.password1 === data.password2;
//         if (!comparePassword) {
//             alert('Password tidak sama');
//             return;
//         }

//         try {
//             const result = await axios.put('http://localhost:3555/api/v1/warga/forgot-password', dataUser);
//             console.log(result);
//             if (result.data.status === 'success') {
//                 window.localStorage.setItem('token', result.data.token);
//                 window.location.href = '/login';
//                 confirm('Berhasil mengubah password');
//             } else {
//                 alert('Gagal mengubah password');
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }

        
//     };

//     return (
//         <>
//             <div className="login-btn d-flex justify-content-between mt-5">
//                 <button
//                     onClick={handleSubmit}
//                 >
//                     Confirm
//                 </button>
//             </div>
//         </>
//     );
// };

// ButtonForgotPass.propTypes = {
//     data: PropTypes.object.isRequired,
// };

// export default ButtonForgotPass;
