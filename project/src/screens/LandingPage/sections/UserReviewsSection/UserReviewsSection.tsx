import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useStaggerAnimation } from "../../../../hooks/useStaggerAnimation";

const businessSectors = [
  {
    icon: "/group-1000003862.png",
    title: "Gimnasios y fitness",
    description:
      "Ofrece membresías mensuales y olvídate de los cobros manuales.",
  },
  {
    icon: "/group-1000003863.png",
    title: "Spas y centros de bienestar",
    description:
      "Crea planes sencillos para tus servicios y cobra todos los meses.",
  },
  {
    icon: "/group-1000003864.png",
    title: "Coworkings",
    description: "Gestiona membresías de acceso y recibe pagos automáticos.",
  },
  {
    icon: "/group-1000003865.png",
    title: "Academias y talleres",
    description: "Recibe los pagos mensuales de tus cursos, sin esfuerzo.",
  },
  {
    icon: "/group-1000003866.png",
    title: "Clubes sociales y deportivos",
    description: "Mantén las membresías activas y cobra a tus socios cada mes.",
  },
  {
    icon: "/group-1000003867.png",
    title: "Servicios profesionales",
    description:
      "Factura asesorías o mantenimientos con cobros periódicos simples.",
  },
  {
    icon: "/group-1000003868.png",
    title: "Barberías o salones de belleza",
    description: "Cobra membresías mensuales para cortes y servicios.",
  },
  {
    icon: "/group-1000003869.png",
    title: "Entrenadores personales",
    description: "Recibe pagos fijos por asesorías y rutinas cada mes.",
  },
];

export const UserReviewsSection = (): JSX.Element => {
  const { elementRef, isVisible, getItemStyle } = useStaggerAnimation(businessSectors.length, 0.1, 80);

  return (
    <section
      id="sectores"
      ref={elementRef}
      className="flex flex-col w-full items-center justify-center gap-[42px] px-4 md:px-[178px] pt-[30px] md:pt-[60px] pb-[60px] md:pb-[124px]">
      <h2 className={`[font-family:'Funnel_Display',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-[51.6px] text-center tracking-[-1.09px] leading-tight md:leading-[59px] px-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        Perfecto para tu sector
      </h2>

      <p className={`max-w-[705px] [font-family:'Degular-Regular',Helvetica] font-normal text-white text-xl md:text-2xl text-center tracking-[0] leading-[30px] transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <span className="[font-family:'Degular-Bold',Helvetica] font-bold">
          +Breve
        </span>{" "}
        es ideal para cualquier negocio local que ofrece suscripciones,
        membresías o planes mensuales sencillos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[19px] w-full">
        {businessSectors.map((sector, index) => (
          <Card
            key={index}
            style={getItemStyle(index)}
            className={`bg-[#f7f7ff] rounded-[31.55px] border-[0.93px] border-solid border-[#1111110d] h-auto transition-all duration-700 hover:scale-105 hover:shadow-lg ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <CardContent className="p-8 md:p-[34px] flex flex-col gap-[13px]">
              <img
                className="w-[60.32px] h-[60.32px]"
                alt={sector.title}
                src={sector.icon}
              />
              <h3 className="[font-family:'Funnel_Display',Helvetica] font-medium text-[#272625] text-[26px] tracking-[0] leading-[26.0px]">
                {sector.title}
              </h3>
              <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-[#111111] text-[18.6px] tracking-[0] leading-[23.2px]">
                {sector.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
