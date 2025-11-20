import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const demoUrls = {
  flujo: "https://supademo.com/embed/cm3owbcmu17g4128qvzg18p33",
  tablero: "https://supademo.com/embed/YOUR_ANALYTICS_DEMO_ID",
  portal: "https://supademo.com/embed/YOUR_PAYMENTS_DEMO_ID",
};

export const MainContentSection = (): JSX.Element => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [activeDemo, setActiveDemo] = useState<keyof typeof demoUrls>("flujo");

  return (
    <section
      ref={elementRef}
      className={`flex flex-col w-full items-center gap-8 md:gap-12 lg:gap-[57px] px-4 md:px-12 lg:px-[77px] py-12 md:py-16 lg:py-[73px] relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      <div className="flex flex-col w-full max-w-[950px] items-center gap-6 md:gap-12 relative">
        <div className="flex flex-col items-center gap-6 relative w-full">
          <h1 className="relative flex items-center justify-center w-full max-w-[796px] [font-family:'Funnel_Display',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-5xl text-center tracking-[-0.48px] leading-tight md:leading-[53.2px]">
            Gestión completa de suscripciones y pagos para tu negocio.
          </h1>

          <p className="relative flex items-center justify-center w-full [font-family:'Degular-Regular',Helvetica] font-normal text-[#fffffff2] text-base md:text-xl lg:text-2xl text-center tracking-[0] leading-relaxed md:leading-[30px]">
            Con +Breve, tus clientes pueden suscribirse desde cualquier canal,
            WhatsApp, Instagram, TikTok o tu web, en minutos. Nosotros nos
            encargamos del proceso, tú te concentras en crecer.
          </p>
        </div>

        <Button className="sm:hidden w-full max-w-[350px] h-[50px] rounded-[65.53px] border-0 bg-[linear-gradient(270deg,rgba(255,136,170,1)_0%,rgba(107,78,230,1)_73%)] [font-family:'Degular-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-[18.0px] hover:opacity-90 transition-opacity shadow-none focus-visible:ring-0 ring-[3.16px] ring-[#f9fafa4c] ring-inset">
          Contratar
        </Button>

        <ToggleGroup
          type="single"
          value={activeDemo}
          onValueChange={(value) => value && setActiveDemo(value as keyof typeof demoUrls)}
          className="relative w-full max-w-[678px] h-auto md:h-[47px] rounded-[43px] border border-solid border-[#c3b7ff] bg-transparent p-0 flex flex-row"
        >
          <ToggleGroupItem
            value="flujo"
            className="flex-1 h-[47px] rounded-[43px] data-[state=on]:bg-[linear-gradient(214deg,rgba(255,239,243,1)_0%,rgba(203,193,255,1)_100%)] data-[state=on]:text-[#3a3a3a] text-white [font-family:'Degular-Semibold',Helvetica] font-normal text-base sm:text-sm md:text-base lg:text-xl tracking-[0] leading-tight border-0 px-2 sm:px-3 md:px-4 text-center flex items-center justify-center whitespace-nowrap"
          >
            <span className="hidden sm:inline">Flujo de suscripción</span>
            <span className="sm:hidden">Suscripción</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="tablero"
            className="flex-1 h-[47px] rounded-[43px] data-[state=on]:bg-[linear-gradient(214deg,rgba(255,239,243,1)_0%,rgba(203,193,255,1)_100%)] data-[state=on]:text-[#3a3a3a] text-white [font-family:'Degular-Semibold',Helvetica] font-normal text-base sm:text-sm md:text-base lg:text-xl tracking-[0] leading-tight border-0 px-2 sm:px-3 md:px-4 text-center flex items-center justify-center whitespace-nowrap"
          >
            <span className="hidden sm:inline">Tablero de analítica</span>
            <span className="sm:hidden">Analítica</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="portal"
            className="flex-1 h-[47px] rounded-[43px] data-[state=on]:bg-[linear-gradient(214deg,rgba(255,239,243,1)_0%,rgba(203,193,255,1)_100%)] data-[state=on]:text-[#3a3a3a] text-white [font-family:'Degular-Semibold',Helvetica] font-normal text-base sm:text-sm md:text-base lg:text-xl tracking-[0] leading-tight border-0 px-2 sm:px-3 md:px-4 text-center flex items-center justify-center whitespace-nowrap"
          >
            <span className="hidden sm:inline">Portal de pagos</span>
            <span className="sm:hidden">Pagos</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="relative w-full max-w-[1188px] overflow-hidden">
        <Card className="relative w-full h-[500px] md:h-[600px] lg:h-[768px] bg-gray-50 rounded-[29px] overflow-hidden border-0 shadow-none">
          <CardContent className="relative w-full h-full p-0 flex items-center justify-center bg-gray-50">
            <iframe
              key={activeDemo}
              src={demoUrls[activeDemo]}
              title="Demo interactivo de +Breve"
              className="w-full h-full rounded-[29px] border-0"
              allow="clipboard-write"
              allowFullScreen
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
