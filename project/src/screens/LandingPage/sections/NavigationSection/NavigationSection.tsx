import React from "react";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const navigationLinks = [
  { text: "¿Cómo funciona?", href: "#como-funciona" },
  { text: "Características", href: "#caracteristicas" },
  { text: "Preguntas frecuentes", href: "#preguntas-frecuentes" },
  { text: "Gestionar negocio", href: "#gestionar-negocio" },
  { text: "Pagar suscripción", href: "#pagar-suscripcion" },
  { text: "Contacto", href: "#contacto" },
];

export const NavigationSection = (): JSX.Element => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      ref={elementRef}
      className="flex flex-col md:flex-row w-full items-start justify-between gap-8 md:gap-12 px-4 md:px-12 lg:px-[74px] py-12 md:py-16 lg:py-[110px] bg-[#52319C]">
      <div className={`flex flex-col w-full md:w-auto md:max-w-[595px] items-start gap-6 md:gap-[34px] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <img
          className="w-[124px] h-[26.82px]"
          alt="Group"
          src="/group-1000003767.png"
        />

        <p className="flex items-center justify-center self-stretch min-h-[81px] [font-family:'Degular-Regular',Helvetica] font-normal text-white text-base tracking-[0] leading-relaxed md:leading-6">
          Tus clientes ya están listos para suscribirse. Con +Breve recibes esos
          ingresos automáticamente, sin procesos manuales ni seguir mensajes uno
          a uno.
        </p>

        <img
          className="self-stretch w-full flex-[0_0_auto]"
          alt="Link img linkedin"
          src="/link---img---linkedin-.svg"
        />
      </div>

      <nav className={`flex flex-col w-full md:w-auto items-start gap-4 md:gap-5 transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h3 className="[font-family:'Degular-Semibold',Helvetica] font-semibold text-white text-lg tracking-[0] leading-tight">
          Producto
        </h3>

        <ul className="flex flex-col items-start gap-2 md:gap-3 self-stretch w-full">
          {navigationLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="[font-family:'Degular-Regular',Helvetica] font-normal text-white text-sm tracking-[0] leading-relaxed cursor-pointer hover:opacity-80 transition-opacity"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
