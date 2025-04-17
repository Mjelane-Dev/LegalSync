import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getClient } from "@/lib/actions/clients.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const client = await getClient(userId);

  return (
    <div className="flex  bg-[#1d3a57]">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <text className="mb-12 text-lg font-bold">LegalSync</text>

          <AppointmentForm
            clientId={client?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">©LegalSync</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] rounded-l-3xl bg-bottom"
      />
    </div>
  );
};

export default Appointment;
