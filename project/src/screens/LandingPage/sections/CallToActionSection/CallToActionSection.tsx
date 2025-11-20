import { MenuIcon, XIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";

const navigationItems = [
  { label: "¿Cómo funciona?", href: "#como-funciona" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Preguntas frecuentes", href: "#preguntas-frecuentes" },
  { label: "Gestionar negocio", href: "#gestionar-negocio" },
  { label: "Pagar suscripción", href: "#pagar-suscripcion" },
  { label: "Contacto", href: "#contacto" },
];

export const CallToActionSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleScrollTo = (href: string) => {
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
    <header className="flex flex-col w-full items-start gap-2.5 px-4 md:px-12 lg:px-[76px] py-[30px]">
      <nav className={`flex items-center justify-between gap-4 px-4 md:px-[25px] py-4 md:py-2 bg-[#381472] rounded-[54px] w-full relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <img
          className="w-[113px] h-[24.44px] flex-shrink-0"
          alt="Group"
          src="/group-1000003767-1.png"
        />

        <ul className="hidden md:flex items-center gap-3 lg:gap-6 list-none m-0 p-0">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleScrollTo(item.href)}
                className="flex items-center justify-center h-5 [font-family:'Degular-Regular',Helvetica] font-normal text-white text-[10px] lg:text-base tracking-[0] leading-[22.4px] whitespace-nowrap bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block md:min-w-[180px] lg:w-[235px] h-[50.64px]">
          <Button className="w-full h-full rounded-[65.53px] border-0 bg-[linear-gradient(270deg,rgba(255,136,170,1)_0%,rgba(107,78,230,1)_73%)] [font-family:'Degular-Medium',Helvetica] font-medium text-white text-lg lg:text-[23.1px] text-center tracking-[0] leading-[18.0px] hover:opacity-90 transition-opacity shadow-none focus-visible:ring-0 ring-[3.16px] ring-[#f9fafa4c] ring-inset">
            Contratar
          </Button>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#381472] rounded-[24px] p-4 md:hidden z-50">
            <ul className="flex flex-col gap-4 list-none m-0 p-0 mb-4">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <button
                    className="w-full text-left [font-family:'Degular-Regular',Helvetica] font-normal text-white text-base tracking-[0] leading-[22.4px] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity p-2"
                    onClick={() => {
                      handleScrollTo(item.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <Button className="w-full h-[50px] rounded-[65.53px] border-0 bg-[linear-gradient(270deg,rgba(255,136,170,1)_0%,rgba(107,78,230,1)_73%)] [font-family:'Degular-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-[18.0px] hover:opacity-90 transition-opacity shadow-none focus-visible:ring-0 ring-[3.16px] ring-[#f9fafa4c] ring-inset">
              Contratar
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};
