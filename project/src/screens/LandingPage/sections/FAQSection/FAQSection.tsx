import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

export const FAQSection = (): JSX.Element => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="caracteristicas"
      ref={elementRef}
      className={`flex flex-col w-full items-center justify-center gap-12 md:gap-16 lg:gap-[87px] px-4 md:px-12 lg:px-[177px] pb-8 md:pb-24 lg:pb-36 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      <h2 className="relative self-stretch min-h-[59px] font-medium text-white text-3xl md:text-4xl lg:text-[51.6px] text-center tracking-[-1.09px] leading-tight md:leading-[59px] flex items-center justify-center [font-family:'Funnel_Display',Helvetica] px-4">
        Todo lo que necesitas, en un solo lugar
      </h2>

      <div className="flex flex-col items-center gap-6 lg:gap-[27px] w-full max-w-[1580px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-[23px] w-full">
          <Card className="relative w-full lg:flex-[2] h-[450px] lg:h-[562px] overflow-hidden border-0 shadow-none">
            <CardContent className="p-0 relative w-full h-full">
              <div className="absolute inset-0 bg-[#371682] rounded-[31.55px]" />
              <div className="absolute inset-0 rounded-[31.55px] border border-solid border-[#ffffff3d] bg-[linear-gradient(303deg,rgba(77,4,150,0)_0%,rgba(107,27,161,1)_76%)]" />

              <div className="relative z-10 flex flex-col justify-between w-full h-full">
                <div className="flex flex-col gap-3 lg:gap-4 p-6 md:p-8 lg:hidden">
                  <h3 className="[font-family:'Degular-Medium',Helvetica] text-white text-2xl md:text-2xl leading-tight font-medium tracking-[0]">
                    Dashboard con métricas en tiempo real
                  </h3>
                  <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base tracking-[0] leading-relaxed">
                    Visualiza ingresos, nuevos suscriptores, churn y retención en un solo dashboard.
                  </p>
                </div>

                <div className="w-full flex justify-center pb-0 lg:hidden">
                  <img
                    className="w-full max-w-[380px] h-auto object-contain"
                    alt="Dashboard metrics"
                    src="/phone-01-1.png"
                  />
                </div>

                <div className="hidden lg:flex lg:flex-row lg:items-end lg:justify-between w-full h-full">
                  <div className="flex flex-col gap-4 p-10 pl-12 self-center w-[45%] flex-shrink-0">
                    <h3 className="[font-family:'Degular-Medium',Helvetica] text-white text-[30px] leading-tight font-medium tracking-[0]">
                      Dashboard con métricas en tiempo real
                    </h3>
                    <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-white text-xl tracking-[0] leading-relaxed">
                      Visualiza ingresos, nuevos suscriptores, churn y retención en un solo dashboard.
                    </p>
                  </div>

                  <div className="flex-1 flex items-end justify-end pb-0">
                    <img
                      className="w-full max-w-[480px] h-auto object-contain"
                      alt="Dashboard metrics"
                      src="/phone-01-1.png"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative w-full lg:flex-1 h-[450px] lg:h-[562px] overflow-hidden border-0 shadow-none">
            <CardContent className="p-0 relative w-full h-full">
              <div className="absolute inset-0 bg-[#371682] rounded-[31.55px]" />
              <div className="absolute inset-0 rounded-[31.55px] border border-solid border-[#ffffff3d] bg-[linear-gradient(342deg,rgba(77,4,150,0)_0%,rgba(107,27,161,1)_73%)]" />

              <div className="relative z-10 flex flex-col justify-between w-full h-full">
                <div className="flex flex-col gap-3 p-6 md:p-8 lg:p-10">
                  <h3 className="[font-family:'Degular-Medium',Helvetica] text-white text-2xl md:text-2xl lg:text-[30px] leading-tight font-medium tracking-[0]">
                    Gestión completa de suscriptores
                  </h3>
                  <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base lg:text-xl tracking-[0] leading-relaxed">
                    Controla quién está activo, pausado o cancelado desde un solo lugar.
                  </p>
                </div>

                <div className="w-full flex justify-center pb-0">
                  <img
                    className="w-full max-w-[400px] md:max-w-[480px] lg:max-w-full h-auto object-contain"
                    alt="Subscriber management"
                    src="/suscrip-1.png"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-[18px] w-full">
          <Card className="relative w-full lg:flex-1 h-[450px] lg:h-[486px] overflow-hidden border-0 shadow-none">
            <CardContent className="p-0 relative w-full h-full overflow-hidden rounded-[31.55px]">
              <div className="absolute inset-0 bg-[#371682] rounded-[31.55px]" />
              <div className="absolute inset-0 rounded-[31.55px] border border-solid border-[#ffffff3d] bg-[linear-gradient(303deg,rgba(77,4,150,0)_0%,rgba(107,27,161,1)_80%)]" />

              <div className="relative z-10 flex flex-col h-full overflow-hidden">
                <div className="flex flex-col gap-3 p-6 md:p-8 lg:p-10">
                  <h3 className="[font-family:'Degular-Medium',Helvetica] text-white text-2xl md:text-2xl lg:text-[30px] leading-tight font-medium tracking-[0]">
                    Pago a través de Wompi
                  </h3>
                  <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base lg:text-xl tracking-[0] leading-relaxed">
                    Tus clientes pagan con tarjeta, PSE, Nequi, transferencia Bancolombia y otros métodos de pago disponibles.
                  </p>
                </div>

                <div className="w-full flex justify-center items-end flex-grow overflow-hidden">
                  <img
                    className="w-full max-w-[350px] md:max-w-[380px] lg:max-w-full h-auto object-contain"
                    alt="Payment methods"
                    src="/mask-group-1.png"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative w-full lg:flex-[2] h-[450px] lg:h-[486px] overflow-hidden border-0 shadow-none">
            <CardContent className="p-0 relative w-full h-full">
              <div className="absolute inset-0 bg-[#371682] rounded-[31.55px]" />
              <div className="absolute inset-0 rounded-[31.55px] border border-solid border-[#ffffff3d] bg-[linear-gradient(303deg,rgba(77,4,150,0)_0%,rgba(107,27,161,1)_77%)]" />

              <div className="relative z-10 flex flex-col justify-between w-full h-full">
                <div className="flex flex-col gap-3 lg:gap-4 p-6 md:p-8 lg:hidden">
                  <h3 className="[font-family:'Degular-Medium',Helvetica] text-white text-2xl md:text-2xl leading-tight font-medium tracking-[0]">
                    Recordatorios Automáticos de Pago
                  </h3>
                  <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base tracking-[0] leading-relaxed">
                    Ayuda a que tus clientes paguen a tiempo con mensajes personalizados enviados antes del vencimiento, todo de forma automática y controlada desde tu dashboard.
                  </p>
                </div>

                <div className="w-full flex justify-center pb-0 lg:hidden">
                  <img
                    className="w-full max-w-[380px] h-auto object-contain"
                    alt="Automatic reminders"
                    src="/mask-group-2.png"
                  />
                </div>

                <div className="hidden lg:flex lg:flex-row lg:items-end lg:justify-between w-full h-full">
                  <div className="flex flex-col gap-4 p-10 pl-12 self-center w-[50%] flex-shrink-0">
                    <h3 className="[font-family:'Degular-Medium',Helvetica] text-white text-[30px] leading-tight font-medium tracking-[0]">
                      Recordatorios Automáticos de Pago
                    </h3>
                    <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-white text-xl tracking-[0] leading-relaxed">
                      Ayuda a que tus clientes paguen a tiempo con mensajes personalizados enviados antes del vencimiento, todo de forma automática y controlada desde tu dashboard.
                    </p>
                  </div>

                  <div className="flex-1 flex items-end justify-end pb-0 overflow-hidden">
                    <img
                      className="w-full max-w-[550px] h-auto object-contain"
                      alt="Automatic reminders"
                      src="/mask-group-2.png"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
