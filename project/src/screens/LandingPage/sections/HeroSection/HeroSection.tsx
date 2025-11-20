import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const calendarData = [
  { day: "", dates: ["", "7", "14", "21", "28"] },
  {
    day: "TUE",
    dates: ["1", "8", "15", "22", "29"],
    highlighted: [4],
    hasDot: [3],
  },
  { day: "WED", dates: ["2", "9", "16", "23", "30"], highlighted: [3, 4] },
  { day: "THU", dates: ["3", "10", "17", "24"], highlighted: [3] },
  { day: "FRI", dates: ["4", "11", "18", "25"], highlighted: [3] },
  { day: "SAT", dates: ["5", "12", "19", "26"], highlighted: [3] },
  { day: "SUN", dates: ["6", "13", "20", "27"] },
];

export const HeroSection = (): JSX.Element => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      ref={elementRef}
      className={`flex flex-col w-full gap-8 md:gap-12 px-4 md:px-12 lg:px-[226px] pt-12 md:pt-20 lg:pt-[151px] pb-[100px] relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      <div className="flex flex-col lg:flex-row w-full items-start lg:items-center justify-between gap-8 md:gap-12 lg:gap-[74px]">
        <div className="flex flex-col gap-6 md:gap-[27px] flex-1 w-full lg:w-auto lg:max-w-[600px]">
          <h2 className="[font-family:'Funnel_Display',Helvetica] font-semibold text-white text-4xl md:text-5xl lg:text-[56px] tracking-[-0.5px] md:tracking-[-1.5px] leading-[1.1] md:leading-[1.15]">
            Agenda una reunión personalizada
          </h2>

          <p className="[font-family:'Degular-Regular',Helvetica] font-normal text-[#fffffff2] text-base md:text-xl lg:text-2xl tracking-[0] leading-relaxed md:leading-[30px]">
            ¿Tienes preguntas, quieres conocer mejor la plataforma o necesitas una
            demo? Reserva una cita y conversemos sobre cómo potenciar tu negocio
            con nuestra solución de suscripciones.
          </p>
        </div>

        <Card className="hidden lg:flex flex-shrink-0 bg-white rounded-[16.8px] border-[0.7px] border-[#1a1a1a1a] lg:w-auto lg:max-w-[650px]">
          <CardContent className="flex flex-col lg:flex-row p-0 w-full">
          <div className="flex flex-col w-full lg:w-[280px] lg:flex-shrink-0 justify-between p-5 md:p-7 border-b lg:border-b-0 lg:border-r-[0.7px] border-[#0000001a]">
            <div className="flex flex-col gap-[23.94px]">
              <div className="flex flex-col gap-[7.98px]">
                <img
                  className="w-[63.84px] h-[63.84px] object-cover"
                  alt="Image"
                  src="/image.png"
                />

                <div className="flex flex-col">
                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a99] text-base tracking-[0] leading-[23.9px]">
                    Account name
                  </div>

                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a] text-[27.9px] tracking-[0] leading-[41.9px]">
                    Event title
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[11.97px]">
                <div className="flex items-center gap-[7.98px]">
                  <img
                    className="w-[19.95px] h-[19.95px]"
                    alt="Time icon"
                    src="/time-icon.svg"
                  />

                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a99] text-base tracking-[0] leading-6">
                    30 min
                  </div>
                </div>

                <div className="flex items-center gap-[7.98px]">
                  <img
                    className="w-[19.95px] h-[19.95px]"
                    alt="Video call icon"
                    src="/video-call-icon.svg"
                  />

                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a99] text-base tracking-[0] leading-6">
                    Web conferencing details provided upon confirmation.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#0069ff] text-sm tracking-[0] leading-[21px]">
                Cookie settings
              </button>

              <button className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#1a1a1a] text-sm tracking-[0] leading-[21px]">
                Report abuse
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-5 md:p-7 w-full lg:w-[350px] lg:flex-shrink-0 min-h-[400px] lg:min-h-[500px]">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg min-h-[300px]">
              <p className="text-gray-500 text-center px-4">
                Calendly widget will be embedded here
              </p>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:hidden flex-shrink-0 bg-white rounded-[16.8px] border-[0.7px] border-[#1a1a1a1a] w-full">
        <CardContent className="flex flex-col p-0 w-full">
          <div className="flex flex-col w-full justify-between p-5 md:p-7 border-b border-[#0000001a]">
            <div className="flex flex-col gap-[23.94px]">
              <div className="flex flex-col gap-[7.98px]">
                <img
                  className="w-[63.84px] h-[63.84px] object-cover"
                  alt="Image"
                  src="/image.png"
                />

                <div className="flex flex-col">
                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a99] text-base tracking-[0] leading-[23.9px]">
                    Account name
                  </div>

                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a] text-[27.9px] tracking-[0] leading-[41.9px]">
                    Event title
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[11.97px]">
                <div className="flex items-center gap-[7.98px]">
                  <img
                    className="w-[19.95px] h-[19.95px]"
                    alt="Time icon"
                    src="/time-icon.svg"
                  />

                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a99] text-base tracking-[0] leading-6">
                    30 min
                  </div>
                </div>

                <div className="flex items-center gap-[7.98px]">
                  <img
                    className="w-[19.95px] h-[19.95px]"
                    alt="Video call icon"
                    src="/video-call-icon.svg"
                  />

                  <div className="[font-family:'Proxima_Nova-Bold',Helvetica] font-bold text-[#1a1a1a99] text-base tracking-[0] leading-6">
                    Web conferencing details provided upon confirmation.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#0069ff] text-sm tracking-[0] leading-[21px]">
                Cookie settings
              </button>

              <button className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#1a1a1a] text-sm tracking-[0] leading-[21px]">
                Report abuse
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-5 md:p-7 w-full min-h-[400px]">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg min-h-[300px]">
              <p className="text-gray-500 text-center px-4">
                Calendly widget will be embedded here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
