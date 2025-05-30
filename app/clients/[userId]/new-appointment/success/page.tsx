import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Lawyer } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const lawyer = Lawyer.find(
    (lawyer) => lawyer.name === appointment?.primaryLawyer
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%] ">
      <div className="success-img">
        <Link href="/">
          <text className="mb-12 text-lg font-bold">LegalSync</text>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={lawyer?.image!}
              alt="lawyer"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">{lawyer?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/clients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">©LeagalSync</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
