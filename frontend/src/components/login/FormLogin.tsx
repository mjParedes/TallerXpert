"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {},
  });

  const onSubmit = async (data: LoginForm) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Login exitoso
        const result = await response.json();
        console.log(result);
        setShowSuccessModal(true); // Mostrar el modal de éxito
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setErrorMessage("Error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false); // Cierra el modal después de 5 segundos
        router.push("/dashboard"); // Redirige al usuario al inicio de sesión
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
              "w-full h-12 p-3 rounded-lg border border-solid focus:outline-none",
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

        <div>
          <button className="bg-white w-full h-12 rounded-lg">
            Iniciar sesión con Google
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
            {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </div>

        <div className="text-center">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-500">
            Regístrate
          </a>
        </div>
      </form>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">¡Inicio de sesión exitoso!</h2>
            <p>Ha iniciado sesión correctamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};
