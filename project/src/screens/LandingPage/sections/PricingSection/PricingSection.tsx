import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useStaggerAnimation } from "../../../../hooks/useStaggerAnimation";

const steps = [
  {
    number: 1,
    title: "Configuramos tu flujo de suscripción",
    description:
      "Recibimos la información de tu negocio, tus planes y precios. Nuestro equipo configura tu flujo personalizado para que tus clientes puedan suscribirse y pagar desde cualquier canal.",
    image: "/group-1000003853.png",
    features: [
      {
        icon: "/background-shadow-1.svg",
        text: "Configuración asistida por nuestro equipo",
      },
      {
        icon: "/background-shadow.svg",
        text: "Flujo personalizado para tu negocio",
      },
      {
        icon: "/group-1000003843.png",
        text: "Enlace listo para compartir en WhatsApp, Instagram o donde quieras",
      },
    ],
  },
  {
    number: 2,
    title: "Conecta tu cuenta bancaria",
    description:
      "Agrega tu cuenta bancaria y deja que +Breve se encargue del resto. Tus clientes pagan de forma segura con Wompi y tú recibes el dinero automáticamente.",
    image: "/group-1000003856.png",
    features: [
      {
        icon: "/group-1000003846.png",
        text: "Pagos seguros y automáticos",
      },
      {
        icon: "/background-shadow-3.svg",
        text: "Sin esperas ni procesos manuales",
      },
      {
        icon: "/group-1000003848.png",
        text: "Compatible con múltiples métodos de pago.",
      },
    ],
  },
  {
    number: 3,
    title: "Gestiona todo desde tu dashboard",
    description:
      "Accede a tu panel y visualiza tus ingresos, planes y suscriptores en tiempo real. Controla tus cobros, analiza tus métricas y haz crecer tu negocio con datos claros.",
    image: "/group-1000003858.png",
    features: [
      {
        icon: "/group-1000003912.png",
        text: "Dashboard con métricas en tiempo real",
      },
      {
        icon: "/group-1000003911.png",
        text: "Control de planes y suscriptores",
      },
      {
        icon: "/background-shadow-2.svg",
        text: "Cobros automatizados y sin fricción",
      },
    ],
  },
];

export const PricingSection = (): JSX.Element => {
  const { elementRef, isVisible, getItemStyle } = useStaggerAnimation(steps.length, 0.1, 150);

  return (
    <section
      id="como-funciona"
      ref={elementRef}
      className="w-full px-4 md:px-8 lg:px-[77px] py-8 md:py-16 lg:py-20 relative">
      <div className="w-full max-w-[1366px] mx-auto">
        <h2 className={`[font-family:'Funnel_Display',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-[51.6px] text-center tracking-[-1.09px] leading-tight md:leading-[59px] mb-12 md:mb-16 lg:mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Comenzar con +Breve es muy fácil
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-[33px] w-full">
          {steps.map((step, index) => (
            <Card
              key={step.number}
              style={getItemStyle(index)}
              className={`relative w-full bg-[#ffffff0a] rounded-[30px] border-0 overflow-hidden transition-all duration-700 hover:scale-105 hover:bg-[#ffffff12] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <CardContent className="flex flex-col p-0">
                <div className="relative w-full px-6 pt-6 pb-6 flex flex-col items-center">
                  <div className="w-[52px] h-[52px] rounded-full bg-[linear-gradient(214deg,rgba(255,220,230,1)_0%,rgba(187,173,255,1)_100%)] flex items-center justify-center mb-6">
                    <span className="[font-family:'Albert_Sans',Helvetica] font-medium text-[#69529d] text-[24px] leading-none">
                      {step.number}
                    </span>
                  </div>

                  <div className="w-full flex items-center justify-center">
                    <img
                      className="w-full h-auto object-contain rounded-[20px]"
                      alt={`Step ${step.number}`}
                      src={step.image}
                    />
                  </div>
                </div>

                <div className="flex flex-col px-6 pb-8 gap-4">
                  <h3 className="[font-family:'Degular-Semibold',Helvetica] font-semibold text-white text-xl md:text-[24px] lg:text-[26px] tracking-[-0.5px] leading-tight">
                    {step.title}
                  </h3>

                  <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-white/90 text-base md:text-[17px] lg:text-[18px] tracking-[0] leading-relaxed">
                    {step.description}
                  </p>

                  <div className="flex flex-col gap-3 mt-2">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <img
                          className="w-[48px] h-[48px] flex-shrink-0"
                          alt="Feature icon"
                          src={feature.icon}
                        />
                        <span className="[font-family:'Degular-Medium',Helvetica] font-medium text-white text-[15px] md:text-[16px] lg:text-[17px] tracking-[0] leading-snug">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
