'use client';
import ListAdapter from "@/src/components/ListAdapter";
import { EmailListResponse } from "./type/type";
import { Check, X } from "lucide-react";
import EmailMessageCardItem from "./components/EmailMessageCardItem";
import EMailCardItem from "./components/EmailCardItem";
import { cn } from "@/lib/utils";
import { useEmailContainer } from "./hook/useEmailContainer";

const EmailContainer = ({ data }: { data: EmailListResponse }) => {

    const { status, shapeRef, statusRef,
        taskdoneStatus, selectList, emailmessagelist,
        handleEmail, handleEmailMessage,
        selectMessageList, handleOnCross, handleOnDone } = useEmailContainer();


    if (status === "sendmail") {

        return (
            <div className={cn("flex justify-center items-center h-[80vh]")}>
                <div className=" max-w-[320px] flex flex-col justify-center items-center">
                    <div ref={shapeRef} className="w-20 h-20 rounded-t-full text-xl bg-white text-black flex justify-center items-center font-medium">
                        0
                    </div>
                    <p className="font-medium text-base mt-2 uppercase" ref={statusRef}></p>
                    {taskdoneStatus && (<button className="bg-white cursor-pointer text-black h-11.25 rounded-full px-4 w-max mt-4 font-medium" onClick={() => window.location.reload()}>Go to Home</button>)}
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
                <Check onClick={handleOnDone} className="fixed bottom-5 right-5 rounded-full  size-12 p-2 cursor-pointer bg-white text-black shadow" />
            )}
            {selectList.length !== 0 && (
                <X onClick={handleOnCross} className="fixed bottom-20 right-5 rounded-full  size-12 p-2 cursor-pointer bg-white text-black shadow" />
            )}
        </>
    )
}

export default EmailContainer





