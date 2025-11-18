/**
 * LandingPage.jsx - Página de inicio de HemoApp
 *
 * ¿Qué hace?
 * - Presenta la aplicación a usuarios nuevos
 * - Muestra información sobre el proceso de donación de sangre
 * - Proporciona acceso a las funciones principales (donar/solicitar)
 *
 * ¿Para qué sirve?
 * - Es la primera página que ven los visitantes no autenticados
 * - Explica los beneficios y requisitos para donar sangre
 * - Guía a los usuarios hacia el registro o solicitud de sangre
 *
 * Secciones principales:
 * - Hero: Llamada a la acción principal
 * - Servicios: Características de la plataforma
 * - Requisitos: Información sobre cómo donar
 * - FAQ: Preguntas frecuentes
 * - Nosotros: Información de contacto
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import icono1 from "@/assets/icono-1.png";
import icono2 from "@/assets/icono-2.png";
import icono3 from "@/assets/icono-3.png";
import icono4 from "@/assets/icono-4.png";
import iconosangre from "@/assets/icono-sangre.png";
import instimarca from "@/assets/ipf-marca.png";
import carreramarca from "@/assets/tsdsm-marca.png";
import { useState } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return (
    <div className="min-h-screen bg-background">
      {/* Barra de navegación principal */}
      <nav className="bg-card-foreground py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="HemoApp" className="w-12 object-contain" />
            <span className="text-2xl font-bold text-accent">
              Hemo<span className="font-normal text-primary-foreground">App</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
            <a
              href="#nosotros"
              className="text-primary-foreground hover:opacity-80 font-medium"
              >
              Nosotros
            </a>
            <a
              href="#servicios"
              className="text-primary-foreground hover:opacity-80 font-medium"
              >
              Servicios
            </a>
              </div>
            <Link to="/login">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6">
                Iniciar Sesión
              </Button>
            </Link>
            <button onClick={toggleMenu} className="md:hidden text-primary-foreground text-3xl z-50">
              <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>
          </div>
        </div>
        <div className={`md:hidden absolute top-0 left-0 w-full h-auto bg-card-foreground shadow-2xl transition-transform duration-300 ease-in-out z-30 ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex flex-col items-center pt-20 pb-4 space-y-4">
            <a onClick={toggleMenu} href="#nosotros" className="text-primary-foreground hover:opacity-80 font-medium w-full text-center py-2">
                Nosotros
            </a>
            <a onClick={toggleMenu} href="#servicios" className="text-primary-foreground hover:opacity-80 font-medium w-full text-center py-2">
                Servicios
            </a>
            {/* Botón Iniciar Sesión en el menú móvil */}
            <Link to="/login" className="w-full text-center py-2" onClick={toggleMenu}>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 w-3/4">
                Iniciar Sesión
              </Button>
            </Link>
        </div>
        </div>
      </nav>

      {/* Sección Hero - Presentación principal con gradiente */}
      <section className="bg-gradient-to-b from-card-foreground to-primary py-20 px-6 relative overflow-hidden min-h-[600px]">
        <div className="absolute top-1/4 w-[400px] h-[400px] bg-secondary/40 rounded-full blur-3xl"></div>
        <div className="absolute right-20 top-1/2 w-[300px] h-[300px] bg-accent/30 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6 uppercase">
                CONECTAMOS CON QUIENES MÁS LO NECESITAN
              </h1>
              <p className="text-2xl font-semibold text-primary-foreground/90 mb-8 leading-relaxed">
                HemoApp es la plataforma que une donantes de sangre con
                hospitales e instituciones de salud de manera rápida y segura.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="text-primary-foreground/80 leading-relaxed text-xl font-bold">
                Cada día, miles de personas necesitan sangre para cirugías,
                emergencias y tratamientos. Sin embargo, la falta de donantes
                disponibles sigue siendo un gran desafío.
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-foreground/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-xl rounded-full"
                  >
                  Quiero donar
                </Button>
              </Link>
              <Link to="/solicitar-sangre">
                <Button
                  size="lg"
                  className="bg-popover-foreground hover:bg-accent/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full"
                  >
                  Necesito recibir una donación
                </Button>
              </Link>
                    </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="servicios"
        className="py-16 px-6 bg-primary relative overflow-hidden">
          <div className="absolute right-0 top w-[500px] h-[500px] bg-accent/40 rounded-full blur-3xl"></div>
    <div className="absolute left-20 top w-[300px] h-[300px] bg-secondary/30 rounded-full blur-3xl"></div>
    <div className="absolute left top-2/4 w-[300px] h-[300px] bg-card-foreground/30 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full /80 flex items-center justify-center">
                  <img
                    src={icono1}
                    alt="Registro de donantes"
                    className="w-45 object-contain"
                  />
                </div>
                <p className="text-xl font-bold text-primary-foreground">
                  Registro de donantes
                  <br />
                  voluntarios
                </p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full /80 flex items-center justify-center">
                  <img
                    src={icono2}
                    alt="Solicitudes urgentes"
                    className="w-45 object-contain"
                  />
                </div>
                <p className="text-xl font-bold text-primary-foreground">
                  Solicitudes urgentes de
                  <br />
                  sangre en tiempo real
                </p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full/80 flex items-center justify-center">
                  <img
                    src={icono3}
                    alt="Geolocalización"
                    className="w-45 object-contain"
                  />
                </div>
                <p className="text-xl font-bold text-primary-foreground">
                  Geolocalización de
                  <br />
                  instituciones cercanas
                </p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full/80  flex items-center justify-center">
                  <img
                    src={icono4}
                    alt="Notificaciones"
                    className="w-45 object-contain"
                  />
                </div>
                <p className="text-xl font-bold text-primary-foreground">
                  Notificaciones y<br />
                  recordatorios
                  <br />
                  personalizados
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
                HemoApp simplifica el proceso de donación conectando donantes,
                receptores e instituciones en un solo lugar.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-b from-primary to-accent py-20 px-6 relative overflow-hidden min-h-[600px]">
  <div className="container mx-auto">
    
    {/* TÍTULO PRINCIPAL DE LA SECCIÓN */}
    <h2 className="text-4xl font-bold text-center text-primary-foreground mb-12">
        ¿Qué necesito saber para donar?
    </h2>
    
    {/* CONTENEDOR DE DOS COLUMNAS (Grid simple sin fondo de tarjeta) */}
    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto p-0">
        
        {/* COLUMNA 1: REQUISITOS BÁSICOS (✓) */}
        <div>
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                Requisitos básicos:
            </h3>
            <ul className="space-y-4 text-primary-foreground">
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✓</span>
                    <span className="text-white text-2xl">Tener entre 18 y 65 años</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✓</span>
                    <span className="text-white text-2xl">Pesar más de 50 kg</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✓</span>
                    <span className="text-white text-2xl">Estar en buen estado de salud</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✓</span>
                    <span className="text-white text-2xl">No haber donado en los últimos 3 meses</span>
                </li>
            </ul>
        </div>

        {/* COLUMNA 2: EXCLUSIONES (✗) */}
        <div>
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                No puedes donar si:
            </h3>
            <ul className="space-y-4 text-primary-foreground">
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✗</span>
                    <span className="text-white text-2xl">Tienes tatuajes o piercings recientes (menos de 12 meses)</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✗</span>
                    <span className="text-white text-2xl">Has tenido fiebre o infecciones en las últimas 2 semanas</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✗</span>
                    <span className="text-white text-2xl">Estás embarazada o amamantando</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-white text-xl font-bold">✗</span>
                    <span className="text-white text-2xl">Has tenido cirugías recientes</span>
                </li>
            </ul>
        </div>
    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-accent to-card-foreground py-20 px-6 relative overflow-hidden min-h-[600px]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between gap-8 mb-12">
            <div className="text-primary-foreground">
              <h3 className="text-3xl font-bold mb-4 text-left">
                ¿Es seguro donar sangre con HemoApp?
              </h3>
              <p className="text-lg text-left">
                Sí, trabajamos únicamente con bancos de sangre y hospitales
                certificados
              </p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <img
              src={iconosangre} 
              alt="IconoTransfución"
              className="w-45 object-contain mx-auto" />
            </div>

            <div className="w-1/2 text-primary-foreground">
              <h3 className="text-3xl font-bold mb-4 text-left">
                ¿Tiene costo de servicio?
              </h3>
              <p className="text-lg text-left">
                No, HemoApp es totalmente gratuito para donantes y pacientes
              </p>
            </div>
          </div>
          <div className="text-center py-12 px-8">
            <h3 className="text-4xl font-bold text-primary-foreground mb-4">
              ¿Cómo me registro?
            </h3>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto px-6">
              Descarga la app, completa tus datos y podrás recibir
              notificaciones cuando alguien necesite tu ayuda
            </p>
          </div>
        </div>
      </section>

      {/* Contact / Nosotros Section */}
      <section id="nosotros" className="py-16 px-6 bg-foreground">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="md:w-3/4">

          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Quiénes somos
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-4">
          Somos dos estudiantes de la Tecnicatura Superior de Desarrollo de Software Multiplataforma, 
      comprometidos con minimizar la brecha crítica entre donantes, pacientes 
      e instituciones de hemoterapia.
          </p>
         </div>
         <div className="md:w-1/4 flex justify-end items-center gap-4">
          <img src={instimarca} alt="Marca IPF" className="w-28 object-contain"/>
          <img src={carreramarca} alt="marca de la carrera" className="w-40 object-contain"/>
            </div>
         </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-foreground">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 text-primary-foreground">
            <a href="#nosotros" className="hover:opacity-80">
              Nosotros
            </a>
            <span>|</span>
            <a href="#servicios" className="hover:opacity-80">
              Servicios
            </a>
            <span>|</span>
            <Link to="#" className="hover:opacity-80">
              Preguntas frecuentes
            </Link>
            <span>|</span>
            <Link to="#" className="hover:opacity-80">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
