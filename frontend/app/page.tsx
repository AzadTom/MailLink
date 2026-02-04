export const dynamic = "force-dynamic";
import EmailContainer from "@/src/features/emailsclient/EmailContainer";
import { getEmailList } from "@/src/features/emailsclient/service/emails"

const page = async () => {

  const emaillist = await getEmailList();
  const sendedemaillist = await getEmailList("done");
  if (!emaillist || !sendedemaillist) return null;

  return (
    <div>
      <EmailContainer data={emaillist} data2={sendedemaillist} />
    </div>
  )
}

export default page