"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { login, registerUser } from "@/actions";

interface RegistrationForm {
  fullName: string;
  email: string;
  password: string;
  rol: string;
}

export const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { isValid },
    formState: { errors },
  } = useForm<RegistrationForm>({
    defaultValues: {},
  });

  const onSubmit = async (data: RegistrationForm) => {
    setErrorMessage({});
    setIsSubmitting(true);

    try {
      const res = await registerUser(data);

      if (!res.ok) {
        setErrorMessage({
          general: "Error al registrarse",
        });
        return;
      }

      const responseNextAuth = await login(
        data.email,
        data.password
      );

      if (!responseNextAuth.ok) {
        setErrorMessage({ general: "Error al registrarse" });
        setIsSubmitting(false);
        return;
      }

      setShowSuccessModal(true); // Mostrar el modal de éxito

      setTimeout(() => {
        window.location.replace('/auth/create-workshop')
      }, 2000);
    } catch (error) {
      setErrorMessage({ general: "Error al registrarse" });
    }
  };

  // Función para renderizar los mensajes de error
  const renderErrorMessage = (field: keyof RegistrationForm | "general") => {
    if (errorMessage[field]) {
      return <span className="text-red-500">{errorMessage[field]}</span>;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-md:p-4 max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <div>
          <label htmlFor="name">Nombre y Apellido</label>
          <input
            id="name"
            className={clsx(
              "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none mb-2",
              {
                "border-red-500": errors.fullName || errorMessage.fullName,
              }
            )}
            type="text"
            placeholder="TallerXpert"
            {...register("fullName", { required: true })}
          />
          {errors.fullName?.type === "required" && (
            <span className="text-red-500">
              * El nombre completo es requerido
            </span>
          )}
          {renderErrorMessage("fullName")}
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className={clsx(
              "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none mb-2",
              {
                "border-red-500": errors.email || errorMessage.email,
              }
            )}
            type="email"
            placeholder="TallerXpert@gmail.com"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500 mt-2">
              * El correo electrónico es requerido
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-500">
              * Ingrese un correo electrónico válido
            </span>
          )}
          {renderErrorMessage("email")}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            className={clsx(
              "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none mb-2",
              {
                "border-red-500": errors.password || errorMessage.password,
              }
            )}
            type="password"
            placeholder="********"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500">* La contraseña es requerida</span>
          )}
          {renderErrorMessage("password")}
        </div>

        {renderErrorMessage("general")}

        <button
          disabled={isSubmitting}
          type="submit"
          className={clsx({
            "btn-primary  w-full ": !isValid || !isSubmitting,
            "btn-disable": isSubmitting,
          })}
        >
          {isSubmitting ? "Registrando..." : "Crear Cuenta"}
        </button>

        <button className=" w-full h-12 rounded-lg border-[1px] border-[#6264D5] hover:opacity-70 flex justify-center items-center bg-[#fff] gap-4">
          Iniciar sesión con Google <Image src="/google.svg" height={20} width={20} alt="google" />
        </button>

        <div className="text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href={"/auth/login"}
            className="text-blue-500 border-b-[1px] border-b-blue-500"
          >
            Inicia sesión
          </Link>
        </div>
      </form>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">¡Registro exitoso!</h2>
            <p>Has sido registrado correctamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// 'use client';

// import {useState, useEffect} from 'react';
// import {useForm, useWatch} from 'react-hook-form';
// import clsx from 'clsx';
// import {useRouter} from 'next/navigation';
// import Link from 'next/link';
// interface RegistrationForm {
//   fullName: string;
//   email: string;
//   password: string;
//   rol: string;
// }

// export const RegistrationForm = () => {
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const router = useRouter();

//   const {
//     handleSubmit,
//     register,
//     formState: {isValid},
//     formState: {errors},
//     control,
//   } = useForm<RegistrationForm>({
//     defaultValues: {},
//   });

//   const password = useWatch({
//     control,
//     name: 'password',
//     defaultValue: '',
//   });

//   const onSubmit = async (data: RegistrationForm) => {
//     setErrorMessage('');
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         // Registro exitoso
//         const result = await response.json();
//         console.log(result);
//         setShowSuccessModal(true); // Mostrar el modal de éxito
//       } else {
//         const error = await response.json();
//         setErrorMessage(error.message || 'Error al registrarse');
//       }
//     } catch (error) {
//       setErrorMessage('Error al registrarse');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // const handleCloseModal = () => {
//   //   setShowSuccessModal(false);
//   //   router.push("/login"); // Redirigir a la página de inicio de sesión
//   // };

//   useEffect(() => {
//     if (showSuccessModal) {
//       const timer = setTimeout(() => {
//         setShowSuccessModal(false); // Cierra el modal después de 5 segundos
//         router.push('login'); // Redirige al usuario al inicio de sesión
//       }, 2000);

//       return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
//     }
//   }, [showSuccessModal, router]);

//   return (
//     <div className='bg-white rounded-lg shadow-lg p-8 max-md:p-4 max-w-md mx-auto'>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className='grid grid-cols-1 gap-4'>
//         <div>
//           <label htmlFor='name'>Nombre y Apellido</label>
//           <input
//             id='name'
//             className={clsx(
//               'w-full h-12 p-3 rounded-lg border border-solid focus:outline-none',
//               {
//                 'border-red-500': errors.fullName,
//               }
//             )}
//             type='text'
//             placeholder='TallerXpert'
//             {...register('fullName', {required: true})}
//           />
//           {errors.fullName?.type === 'required' && (
//             <span className='text-red-500'>
//               * El nombre completo es requerido
//             </span>
//           )}
//         </div>

//         <div>
//           <label htmlFor='email'>E-mail</label>
//           <input
//             id='email'
//             className={clsx(
//               'w-full h-12 p-3 rounded-lg border border-solid focus:outline-none',
//               {
//                 'border-red-500': errors.email,
//               }
//             )}
//             type='email'
//             placeholder='TallerXpert@gmail.com'
//             {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
//           />
//           {errors.email?.type === 'required' && (
//             <span className='text-red-500'>
//               * El correo electrónico es requerido
//             </span>
//           )}
//           {errors.email?.type === 'pattern' && (
//             <span className='text-red-500'>
//               * Ingrese un correo electrónico válido
//             </span>
//           )}
//         </div>

//         <div>
//           <label htmlFor='password'>Contraseña</label>
//           <input
//             id='password'
//             className={clsx(
//               'w-full h-12 p-3 rounded-lg border border-solid focus:outline-none',
//               {
//                 'border-red-500': errors.password,
//               }
//             )}
//             type='password'
//             placeholder='********'
//             {...register('password', {required: true, minLength: 8})}
//           />
//           {errors.password?.type === 'required' && (
//             <span className='text-red-500'>* La contraseña es requerida</span>
//           )}
//           {errors.password?.type === 'minLength' && (
//             <span className='text-red-500'>
//               * La contraseña debe tener al menos 8 caracteres
//             </span>
//           )}
//         </div>

//         {/* <div>
//           <input
//             className={clsx(
//               "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none",
//               {
//                 "border-red-500": errors.rol,
//               }
//             )}
//             type="text"
//             placeholder="Rol"
//             {...register("rol", { required: true })}
//           />
//           {errors.password?.type === "required" && (
//             <span className="text-red-500">* El rol es requerido</span>
//           )}
//         </div> */}

//         <div>
//           <button className=' w-full h-12 rounded-lg border-[1px] border-[#6264D5] hover:opacity-70 flex justify-center items-center bg-[#fff] gap-4'>
//             Iniciar sesión con Google <img src='/google.svg' alt='google' />
//           </button>
//         </div>

//         <div>
//           <button
//             disabled={isSubmitting}
//             type='submit'
//             className={clsx({
//               'btn-primary  w-full ': !isValid || !isSubmitting,
//               'btn-disable': isSubmitting,
//             })}>
//             {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
//           </button>
//         </div>

//         <div className='text-center'>
//           ¿Ya tienes una cuenta?{' '}
//           <Link
//             href={'/auth/login'}
//             className='text-blue-500 border-b-[1px] border-b-blue-500'>
//             Inicia sesión
//           </Link>
//         </div>
//       </form>

//       {/* Modal de éxito */}
//       {showSuccessModal && (
//         <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
//           <div className='bg-white p-8 rounded-lg'>
//             <h2 className='text-lg font-bold mb-4'>¡Registro exitoso!</h2>
//             <p>Has sido registrado correctamente.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
