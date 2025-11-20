import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const faqItems = [
  {
    id: "item-1",
    question: "¿Qué es +Breve?",
    answer: "+Breve es una plataforma digital que permite a negocios gestionar y cobrar suscripciones de manera simple, automática y segura. Reúne herramientas para manejar pagos, suscriptores y reportes sin complicaciones.",
  },
  {
    id: "item-2",
    question: "¿Cuánto cuesta usar +Breve?",
    answer: "+Breve tiene un modelo de cobro por transacción, sin costos fijos mensuales. Solo pagas una pequeña comisión por cada suscripción cobrada exitosamente.",
  },
  {
    id: "item-3",
    question: "¿Cuánto tiempo toma implementar +Breve en mi negocio?",
    answer: "Puedes empezar a usar +Breve en minutos. El proceso de registro es rápido y el flujo de suscripción está listo para configurarse y comenzar a recibir pagos el mismo día.",
  },
  {
    id: "item-4",
    question: "¿Necesito conocimientos técnicos para usar +Breve?",
    answer: "No necesitas conocimientos técnicos avanzados. La plataforma está diseñada para ser intuitiva y sencilla; puedes gestionar todo desde un panel amigable. Si necesitas ayuda, te acompañamos en el proceso.",
  },
  {
    id: "item-5",
    question: "¿Qué métodos de pago pueden usar mis clientes?",
    answer: "Tus clientes pueden pagar con tarjeta de crédito, débito, PSE, Nequi y transferencia Bancolombia gracias a la integración con Wompi.",
  },
  {
    id: "item-6",
    question: "¿Cómo recibo el dinero de las suscripciones?",
    answer: "El dinero de tus suscripciones se transfiere directamente a tu cuenta bancaria, habitualmente en el día hábil siguiente a cada pago realizado.",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="preguntas-frecuentes"
      ref={elementRef}
      className={`flex flex-col lg:flex-row w-full items-start justify-between gap-8 md:gap-12 lg:gap-16 px-4 md:px-12 lg:px-[73px] py-16 md:py-24 lg:py-40 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      <h2 className="w-full lg:w-[703px] font-semibold text-[#3d1c87] text-4xl md:text-[64px] tracking-[-0.5px] md:tracking-[-3.00px] leading-tight md:leading-[53.1px] [font-family:'Funnel_Display',Helvetica]">
        Preguntas frecuentes
      </h2>

      <div className="flex flex-col w-full lg:w-[873.86px] items-start gap-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-[#f7f5fd] rounded-[16.26px] border-none px-6 py-2"
            >
              <AccordionTrigger className="hover:no-underline [font-family:'Degular-Regular',Helvetica] font-normal text-[#272727] text-[20px] md:text-lg lg:text-[22.4px] tracking-[0] leading-relaxed md:leading-[33.5px] text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="[font-family:'Degular-Regular',Helvetica] font-normal text-[#272727] text-sm md:text-base lg:text-[18px] tracking-[0] leading-relaxed md:leading-[27px] pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
