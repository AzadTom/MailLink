import { useQuery } from "@tanstack/react-query";
import { getEmailMessageList, sendMail } from "../service/emails";
import { useRef, useState } from "react";
import { EmailListItem, EmailMessageListItem } from "../type/type";

type Tstatus = "emailist" | "emailmessage" | "sendmail";

const mockApiCall = (i: number) => {
    return new Promise((resolve, reject) => {

        if (i === 5) {
            resolve(null);
        }
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

export const useEmailContainer = () => {

    const { data: emailmessagelist } = useQuery({
        queryKey: ['getemail-message-list'],
        queryFn: () => getEmailMessageList(),
        staleTime: 5000,
    });

    const [taskdoneStatus, setTaskDoneStatus] = useState(false);
    const statusRef = useRef<HTMLParagraphElement | null>(null);
    const shapeRef = useRef<HTMLDivElement | null>(null);
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
            const { Name, email, company } = selectList[i];
            const msgIndex = i % selectMessageList.length
            const { subject, message } = selectMessageList[msgIndex];
            const result = await sendMail(email, subject, message, Name ? Name : "Hiring Manager", company ? company : "your company");
            // const result = await mockApiCall(i + 1);
            if (statusRef.current && shapeRef.current && result) {
                shapeRef.current.textContent = `${i + 1}`;
                if (i + 1 === selectList.length) {
                    statusRef.current.textContent = `task ${i + 1} is completed.`;
                    statusRef.current.style.color = `#fff`;

                    setTimeout(() => {
                        if (statusRef.current) {
                            statusRef.current.textContent = 'All Tasks done';
                            setTaskDoneStatus(true);
                        }
                    }, 2000);
                } else {
                    statusRef.current.style.color = `#fff`;
                    statusRef.current.textContent = `task ${i + 1} is completed.`;
                }
            }

            if (statusRef.current && shapeRef.current && !result) {

                shapeRef.current.textContent = `${i + 1}`;
                if (i + 1 === selectList.length) {
                    statusRef.current.textContent = `task ${i + 1} is not completed.`;
                    statusRef.current.style.color = `#e7000b`;
                    setTimeout(() => {
                        if (statusRef.current) {
                            statusRef.current.textContent = 'All Tasks done';
                            setTaskDoneStatus(true);
                        }
                    }, 2000);
                } else {
                    statusRef.current.textContent = `task ${i + 1} is not completed.`;
                    statusRef.current.style.color = `#e7000b`;
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




    return {
        status,
        shapeRef,
        statusRef,
        taskdoneStatus,
        selectList,
        selectMessageList,
        emailmessagelist,
        handleEmail,
        handleEmailMessage,
        handleOnCross,
        handleOnDone,

    }




}