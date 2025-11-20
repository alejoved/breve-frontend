import { Building2Icon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const formFields = [
  {
    id: "fullName",
    label: "Nombre completo",
    placeholder: "Ingresa tu nombre completo",
    icon: UserIcon,
    type: "input",
  },
  {
    id: "companyName",
    label: "Nombre de la empresa",
    placeholder: "Ingresa el nombre de tu empresa",
    icon: Building2Icon,
    type: "input",
  },
  {
    id: "phone",
    label: "Teléfono de contacto",
    placeholder: "Ingresa tu número de teléfono",
    icon: LockIcon,
    type: "input",
  },
  {
    id: "email",
    label: "Correo electrónico",
    placeholder: "Ingresa tu correo electrónico",
    icon: MailIcon,
    type: "input",
  },
  {
    id: "businessDescription",
    label: "Cuéntanos un poco sobre tu negocio",
    placeholder: "Describe lo que hace tu negocio",
    icon: null,
    type: "textarea",
  },
];

export const AppOverviewSection = (): JSX.Element => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="contacto"
      ref={elementRef}
      className={`w-full flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-[122px] px-4 md:px-12 lg:px-[130px] py-8 md:py-16 lg:py-[93px] mb-8 md:mb-16 lg:mb-24 bg-[#ffffff17] rounded-[30px] md:rounded-[60px] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      <div className="flex flex-col w-full lg:w-[724px] items-start gap-6 md:gap-11">
        <h2 className="self-stretch font-medium text-white text-2xl md:text-3xl lg:text-5xl tracking-[0] leading-tight md:leading-[57px] flex items-center justify-center [font-family:'Funnel_Display',Helvetica]">
          ¿Listo para llevar tu negocio al siguiente nivel?
        </h2>

        <p className="w-full lg:w-[538px] [font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-xl lg:text-2xl tracking-[0] leading-relaxed md:leading-[37px]">
          Déjanos tus datos y te ayudaremos a resolver tus dudas o iniciar el
          proceso de contratación.
          <br />
          <br />
          Te contactaremos lo más pronto posible para apoyarte en todo lo que
          necesites.
        </p>
      </div>

      <Card className="w-full lg:w-[520px] bg-[#fefefe] rounded-[20px] md:rounded-[40px] border-0">
        <CardContent className="pt-8 md:pt-10 lg:pt-12 px-4 md:px-6 lg:px-[50px] pb-8 md:pb-10 lg:pb-[50px]">
          <form className="flex flex-col gap-4 md:gap-5 lg:gap-5">
            {formFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-3 md:gap-4 lg:gap-4">
                <Label
                  htmlFor={field.id}
                  className="[font-family:'Degular-Semibold',Helvetica] text-base md:text-lg lg:text-xl tracking-[0.49px] leading-[17.1px] font-normal text-[#1a1a1a]"
                >
                  {field.label}
                </Label>
                <div className="relative">
                  {field.type === "input" ? (
                    <Input
                      id={field.id}
                      placeholder={field.placeholder}
                      className="h-12 md:h-12 lg:h-[50px] rounded-[7.31px] border-[1.22px] border-[#d2d2d2] [font-family:'Inter',Helvetica] font-normal text-[#767676] text-sm md:text-sm lg:text-base tracking-[-0.35px] leading-[31.7px] pr-12 md:pr-[55px]"
                    />
                  ) : (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      className="h-24 md:h-24 lg:h-[90px] rounded-[7.31px] border-[1.22px] border-[#d2d2d2] [font-family:'Inter',Helvetica] font-normal text-[#767676] text-sm md:text-sm lg:text-base tracking-[-0.35px] leading-[31.7px] resize-none"
                    />
                  )}
                  {field.icon && (
                    <field.icon className="absolute right-[19px] top-1/2 -translate-y-1/2 w-6 h-6 text-[#767676]" />
                  )}
                </div>
              </div>
            ))}

            <Button
              type="submit"
              className="h-12 md:h-12 lg:h-[50px] mt-2 md:mt-3 rounded-[70px] bg-[linear-gradient(343deg,rgba(255,136,170,1)_0%,rgba(107,78,230,1)_73%)] [font-family:'Urbanist',Helvetica] font-semibold text-colorwhite-100 text-base md:text-lg lg:text-xl tracking-[0] leading-[31.7px] hover:opacity-90"
            >
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
