import { EmailListItem } from "../type/type";
import { cn } from "@/lib/utils";
import { CheckCircle2, CircleX, Search } from "lucide-react";
import { updateEmail } from "../service/emails";
import toast, { Toaster } from "react-hot-toast";


type CardItemProps = EmailListItem & { series: number } & { selected: (email: string) => boolean } & { handleOnClick: (item: EmailListItem) => void };
const EMailCardItem = (props: CardItemProps) => {
    const { email, selected } = props;

    const emailList = email
        .split(/[,\s;]+/)
        .map(e => e.trim())
        .filter(Boolean);

    return (
        <>
            {emailList.map((singleEmail, index) => (
                <SingleEmailCard
                    key={singleEmail}
                    {...props}
                    selected={selected}
                    email={singleEmail}
                    series={props.series + index}
                />
            ))}
        </>
    );
};

export default EMailCardItem;


const formatDate = (value: string | number | Date) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return "Invalid date";

    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const SingleEmailCard = (props: CardItemProps) => {

    const { Name, company, email, select, series, handleOnClick, selected } = props;
    const handleUpdateEmail = () => {
        updateEmail(email).then(() => {
            toast('Email deleted successfully',
                {
                    icon: <CheckCircle2 size={18} className="text-green-500" />,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
    };
    return (
        <>
            <Toaster />
            <div className={cn("flex gap-2 items-center cursor-pointer mx-4 sm:mx-0 border border-[#787878] p-4 rounded-xl", selected(email) ? "bg-white text-black rounded-xl p-2" : "text-white")} onClick={() => {
                handleOnClick({ ...props });
            }}>
                <div className={cn("aspect-square rounded-full w-12 h-12  flex justify-center items-center  border border-[#363636]", selected(email) ? "bg-black text-white" : "")}>
                    {series}
                </div>
                <div className="w-full">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex  gap-2 items-center">
                            <p className="text-xs p-1 rounded bg-yellow-600 text-white w-max mb-1">{select || "HR"}</p>
                            <p className="text-xs">{formatDate(props["Created Date"])}</p>
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <CircleX onClick={handleUpdateEmail} />
                        </div>
                    </div>
                    <p className="text-base  font-medium">
                        {Name || "Hiring Manager"}
                        <span className="text-xs p-1 rounded bg-orange-600 text-white w-max ml-1">{company}</span>
                    </p>
                    <p className="text-base text-current/50 mt-1  max-w-2xl">
                        <a href={`mailto:${email}`}>{email.substring(0, 28)}</a>
                    </p>
                </div>
            </div>
        </>
    );
};