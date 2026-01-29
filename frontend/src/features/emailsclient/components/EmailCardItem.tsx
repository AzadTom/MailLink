import { useState } from "react";
import { EmailListItem } from "../type/type";
import { cn } from "@/lib/utils";

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

const SingleEmailCard = (props: CardItemProps) => {

    const { Name, company, email, select, series, handleOnClick, selected } = props;

    return (
        <div className={cn("flex gap-2 items-center cursor-pointer mx-4 sm:mx-0", selected(email) ? "bg-white text-black rounded-xl p-2" : "text-white")} onClick={() => {
            handleOnClick({ ...props });
        }}>
            <div className={cn("aspect-square rounded-full w-12 h-12  flex justify-center items-center  border border-[#363636]", selected(email) ? "bg-black text-white" : "")}>
                {series}
            </div>
            <div>
                <p className="text-xs p-1 rounded bg-yellow-600 text-white w-max mb-1">{select || "HR"}</p>
                <p className="text-base  font-medium">
                    {Name || "Hiring Manager"}
                    <span className="text-xs p-1 rounded bg-orange-600 text-white w-max ml-1">{company}</span>
                </p>
                <p className="text-base mt-1 ">
                    <a href={`mailto:${email}`}>{email}</a>
                </p>
            </div>
        </div>
    );
};