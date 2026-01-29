import { EmailMessageListItem } from "../type/type";
import { cn } from "@/lib/utils";

type EmailMessageCardProps = EmailMessageListItem & { selected: (message: string) => boolean } & { handleOnClick: (item: EmailMessageListItem) => void };
const EmailMessageCardItem = (props: EmailMessageCardProps) => {

    const { subject, message, select, handleOnClick, selected } = props;

    return (
        <div className={cn("rounded-xl break-inside-avoid  bg-[#363636] cursor-pointer border border-[#262626] text-white p-4 mx-4", selected(message) ? "bg-white text-black border-2 border-b-4 border-[#e5e7eb] shadow" : "")} onClick={() => {
            handleOnClick({ ...props });
        }}>
            <span className="p-1 bg-orange-600 text-white text-xs rounded">{select}</span>
            <h2 className="mt-2 mb-4 font-medium text-base">{subject}</h2>
            <p className="text-base" dangerouslySetInnerHTML={{ __html: message }}></p>
        </div>
    )
}

export default EmailMessageCardItem;