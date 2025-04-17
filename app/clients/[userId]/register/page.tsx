import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getClient, getUser } from "@/lib/actions/clients.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const client = await getClient(userId);

  if (client) redirect(`/clients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen bg-[#1d3a57]">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <text className="mb-12 text-lg font-bold">LegalSync</text>

          <RegisterForm user={user} />

          <p className="copyright py-12">©LegalSync</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="client"
        className="side-img max-w-[390px] rounded-l-3xl"
      />
    </div>
  );
};

export default Register;
