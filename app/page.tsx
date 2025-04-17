import Image from "next/image";
import Link from "next/link";

import { ClientForm } from "@/components/forms/ClientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen bg-[#1d3a57]">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container max-w-[496px]">
          <text className="mb-12 text-lg font-bold">LegalSync</text>

          <ClientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              ©LegalSync copyright
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="client"
        className="side-img max-w-[40%] rounded-l-3xl"
      />
    </div>
  );
};

export default Home;
