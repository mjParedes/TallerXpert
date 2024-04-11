"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface RegistrationForm {
  fullName: string;
  email: string;
  password: string;
  rol: string;

}

export const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    formState: { errors },
    control,
  } = useForm<RegistrationForm>({
    defaultValues: {},
  });

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const onSubmit = async (data: RegistrationForm) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Registro exitoso
        const result = await response.json();
        console.log(result);
        setShowSuccessModal(true); // Mostrar el modal de éxito
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Error al registrarse");
      }
    } catch (error) {
      setErrorMessage("Error al registrarse");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleCloseModal = () => {
  //   setShowSuccessModal(false);
  //   router.push("/login"); // Redirigir a la página de inicio de sesión
  // };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false); // Cierra el modal después de 5 segundos
        router.push("login"); // Redirige al usuario al inicio de sesión
      }, 2000);

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
    }
  }, [showSuccessModal, router]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <div>
          <input
            className={clsx(
              "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none",
              {
                "border-red-500": errors.fullName,
              }
            )}
            type="text"
            placeholder="Nombre y Apellido"
            {...register("fullName", { required: true })}
          />
          {errors.fullName?.type === "required" && (
            <span className="text-red-500">
              * El nombre completo es requerido
            </span>
          )}
        </div>

        <div>
          <input
            className={clsx(
              "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none",
              {
                "border-red-500": errors.email,
              }
            )}
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500">
              * El correo electrónico es requerido
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-500">
              * Ingrese un correo electrónico válido
            </span>
          )}
        </div>

        <div>
          <input
            className={clsx(
              "w-[370px] h-12 p-3 rounded-lg border border-solid focus:outline-none",
              {
                "border-red-500": errors.password,
              }
            )}
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500">* La contraseña es requerida</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500">
              * La contraseña debe tener al menos 8 caracteres
            </span>
          )}
        </div>

        {/* <div>
          <input
            className={clsx(
              "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none",
              {
                "border-red-500": errors.rol,
              }
            )}
            type="text"
            placeholder="Rol"
            {...register("rol", { required: true })}
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500">* El rol es requerido</span>
          )}
        </div> */}

        <div>
          <button className="bg-white w-full h-12 rounded-lg">
            Crear cuenta con Google
          </button>
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            className={clsx({
              "btn-primary": !isValid || !isSubmitting,
              "btn-disable": isSubmitting,
            })}
          >
            {isSubmitting ? "Registrando..." : "Crear Cuenta"}
          </button>
        </div>

        <div className="text-center">
          ¿Ya tienes una cuenta?{" "}
          <a href="#" className="text-blue-500">
            Inicia sesión
          </a>
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
