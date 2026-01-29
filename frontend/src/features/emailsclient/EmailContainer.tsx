'use client';
import ListAdapter from "@/src/components/ListAdapter";
import { EmailListItem, EmailListResponse, EmailMessageListItem } from "./type/type";
import { useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEmailMessageList, sendMail } from "./service/emails";
import EmailMessageCardItem from "./components/EmailMessageCardItem";
import EMailCardItem from "./components/EmailCardItem";


const mockApiCall = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: {
                    id: 1,
                    name: "Test User",
                    message: "Mock API response"
                }
            })
        }, 2000)
    })
}


type Tstatus = "emailist" | "emailmessage" | "sendmail";
const EmailContainer = ({ data }: { data: EmailListResponse }) => {

    const { data: emailmessagelist } = useQuery({
        queryKey: ['getemail-message-list'],
        queryFn: () => getEmailMessageList(),
        staleTime: 5000,
    });

    const [taskdoneStatus, setTaskDoneStatus] = useState(false);
    const statusRef = useRef<HTMLParagraphElement | null>(null);
    const shapeRef = useRef<HTMLDivElement | null>(null);
    const [enableFullBg, setEnableFullBg] = useState(false);
    const [status, setStatus] = useState<Tstatus>("emailist");
    const [selectList, setSelectList] = useState<EmailListItem[]>([]);
    const [selectMessageList, setSelectMessageList] = useState<EmailMessageListItem[]>([]);




    const handleEmail = (handleitem: EmailListItem) => {
        const isFound = selectList.findIndex((item) => item.email.toLowerCase() === handleitem.email.toLowerCase());
        if (isFound === -1) {
            setSelectList((prev) => ([...prev, handleitem]))
        } else {
            const filterItems = selectList.filter((item) => item.email.toLowerCase() !== handleitem.email.toLowerCase());
            setSelectList(filterItems);
        }
    }

    const handleEmailMessage = (handleitem: EmailMessageListItem) => {
        const isFound = selectMessageList.findIndex((item) => item.message.toLowerCase() === handleitem.message.toLowerCase());
        if (isFound === -1) {

            setSelectMessageList((prev) => ([...prev, handleitem]));
        } else {
            const filterItems = selectMessageList.filter((item) => item.message.toLowerCase() !== handleitem.message.toLowerCase());
            setSelectMessageList(filterItems);
        }

    }

    const handleSendMail = async () => {

        for (let i = 0; i < selectList.length; i++) {
            const { Name, email } = selectList[i];
            const msgIndex = i % selectMessageList.length
            const { subject, message } = selectMessageList[msgIndex];
            // const result = await sendMail(email, subject, message, Name ? Name : "Hiring Manager");
            const result = await mockApiCall();
            if (statusRef.current && shapeRef.current && result) {
                shapeRef.current.textContent = `${i + 1}`;
                if (i + 1 === selectList.length) {
                    statusRef.current.textContent = `task ${i + 1} is completed.`;
                    setTimeout(() => {
                        if (statusRef.current) {
                            statusRef.current.textContent = 'All Tasks done';
                            setTaskDoneStatus(true);
                        }
                    }, 2000);
                } else {
                    statusRef.current.textContent = `task ${i + 1} is completed.`;
                }
            }
        }
    }



    const handleOnDone = () => {
        if (status === "emailist") {
            setStatus("emailmessage");
        }
        else if (status === "emailmessage") {
            setStatus("sendmail");
            handleSendMail();
        }
    }

    const handleOnCross = () => {

        if (status === "emailist") {
            setSelectList([]);
        }
        else if (status === "emailmessage") {
            setStatus("emailist");
        }
    }


    if (status === "sendmail") {

        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className=" max-w-[320px] flex flex-col justify-center items-center">
                    <div ref={shapeRef} className="w-20 h-20 rounded-t-full text-xl bg-white text-black flex justify-center items-center font-medium">
                        0
                    </div>
                    <p className="font-medium text-base mt-2 uppercase" ref={statusRef}></p>
                    {taskdoneStatus && (<button className="bg-white cursor-pointer text-black h-[45px] rounded-full px-4 w-max mt-4 font-medium" onClick={() => window.location.reload()}>Go to Home</button>)}
                </div>
            </div>
        )
    }

    return (
        <>
            {status === "emailist" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                    <ListAdapter
                        data={data.data}
                        renderItem={(item, index) =>
                        (<EMailCardItem key={item.email}
                            {...item} series={index + 1}
                            selected={(email: string) => {
                                const isFound = selectList.findIndex((item) => item.email.toLowerCase() === email.toLowerCase());
                                if (isFound === -1) {
                                    return false;
                                }
                                return true;
                            }}
                            handleOnClick={handleEmail} />)}
                    />
                </div>
            )}
            {status === "emailmessage" && (
                <div className="columns-1 sm:columns-2 md:columns-2  mb-5 space-y-5">
                    {emailmessagelist && (
                        <ListAdapter
                            data={emailmessagelist}
                            renderItem={(item, index) => (<EmailMessageCardItem key={item.message} {...item} selected={(message: string) => {
                                const isFound = selectMessageList.findIndex((item) => item.message.toLowerCase() === message.toLowerCase());
                                if (isFound === -1) {
                                    return false;
                                }
                                return true;
                            }} handleOnClick={handleEmailMessage} />)}
                        />
                    )}
                </div>
            )}
            {selectList.length !== 0 && (
                <Check onClick={handleOnDone} className="fixed bottom-5 right-5 rounded-full  size-12 p-2 cursor-pointer bg-white text-black" />
            )}
            {selectList.length !== 0 && (
                <X onClick={handleOnCross} className="fixed bottom-20 right-5 rounded-full  size-12 p-2 cursor-pointer bg-white text-black" />
            )}
        </>
    )
}

export default EmailContainer





