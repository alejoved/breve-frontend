import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const problemsList = [
  "No tienes un flujo digital para que los clientes se suscriban.",
  "Los pagos dependen de mensajes, recordatorios y seguimiento manual.",
  "No sabes cuántos clientes siguen activos ni cuánto vas a cobrar.",
  "Cambiar planes o precios es complicado para ti y para tus clientes.",
  "No existe un portal donde tus clientes puedan pagar fácilmente.",
];

const solutionsList = [
  "✅  Tienes un flujo de suscripción digital listo para usar.",
  "✅  Tus clientes se suscriben solos y pagan sin escribirte.",
  "✅  Puedes ver estadísticas claras desde un dashboard (pagos, suscriptores, ingresos).",
  "✅  Modificas planes y precios cuando lo necesites.",
  "✅  Tus clientes reciben un portal seguro para pagar.",
  "✅  Los cobros se procesan automáticamente con +Breve a través de Wompi.",
];

export const FeaturesSection = (): JSX.Element => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      ref={elementRef}
      className="flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-[71px] pt-8 md:pt-12 lg:pt-[55px] pb-12 md:pb-16 lg:pb-[91px] px-4 md:px-12 lg:px-[77px] w-full">
      <h2 className={`[font-family:'Funnel_Display',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-[51.6px] text-center tracking-[-1.09px] leading-tight md:leading-[59px] px-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        ¿Por qué tu negocio pierde clientes cada mes?
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 md:gap-8 lg:gap-[34px] w-full max-w-[1358px]">
        <Card className={`relative w-full lg:flex-1 lg:max-w-[662px] min-h-[500px] md:min-h-[550px] lg:min-h-[549px] bg-[#fcf8f90f] rounded-[30px] md:rounded-[40px] lg:rounded-[60px] border-0 shadow-[inset_1px_0px_21.9px_#fc9eb9] hover:shadow-[inset_1px_0px_30px_#fc9eb9] hover:-translate-y-2 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <CardContent className="relative w-full pt-6 pb-[58px] px-6 md:pt-8 md:pb-[74px] md:px-8 lg:pt-[81px] lg:pb-[81px] lg:px-[65px]">
            <div className="w-full mb-4 md:mb-6 [font-family:'Funnel_Display',Helvetica] font-medium text-white text-2xl md:text-2xl lg:text-[32px] tracking-[-0.62px] leading-9">
              Hoy pierdes clientes porque:
            </div>

            <div className="w-full flex flex-col gap-3 md:gap-4 lg:gap-6 [font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base lg:text-xl tracking-[0] leading-relaxed md:leading-6">
              {problemsList.map((problem, index) => (
                <div key={index} className="flex items-start gap-2">
                  <img
                    className="w-[15px] h-[15px] mt-1 flex-shrink-0"
                    alt="Icon"
                    src="/icon-4.svg"
                  />
                  <span>{problem}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`relative w-full lg:flex-1 lg:max-w-[662px] min-h-[500px] md:min-h-[550px] lg:min-h-[549px] bg-[#fcf8f90f] rounded-[30px] md:rounded-[40px] lg:rounded-[60px] border-0 shadow-[inset_1px_0px_21.9px_#58f6a7] hover:shadow-[inset_1px_0px_30px_#58f6a7] hover:-translate-y-2 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <CardContent className="relative w-full pt-6 pb-[58px] px-6 md:pt-8 md:pb-[74px] md:px-8 lg:pt-[81px] lg:pb-[81px] lg:px-[69px]">
            <div className="w-full mb-4 md:mb-6 [font-family:'Funnel_Display',Helvetica] font-bold text-white text-2xl md:text-2xl lg:text-[32px] tracking-[-0.62px] leading-9">
              Con +Breve cambia así:
            </div>

            <div className="w-full [font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base lg:text-xl tracking-[0] leading-relaxed md:leading-6">
              {solutionsList.map((solution, index) => (
                <React.Fragment key={index}>
                  {solution}
                  {index < solutionsList.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};
