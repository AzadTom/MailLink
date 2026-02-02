export const dynamic = "force-dynamic";
import EmailContainer from "@/src/features/emailsclient/EmailContainer";
import { getEmailList } from "@/src/features/emailsclient/service/emails"

const page = async() => {

  const emaillist = await getEmailList();
  if(!emaillist) return null;

  return (
    <div>
      <EmailContainer data={emaillist}/>
    </div>
  )
}

export default page