'use client';
import ListAdapter from "@/src/components/ListAdapter";
import { EmailListItem, EmailListResponse } from "./type/type";
import { Check, Plus, Search, X } from "lucide-react";
import EmailMessageCardItem from "./components/EmailMessageCardItem";
import EMailCardItem from "./components/EmailCardItem";
import { cn } from "@/lib/utils";
import { useEmailContainer } from "./hook/useEmailContainer";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailContainer = ({ data, data2 }: { data: EmailListResponse, data2: EmailListResponse }) => {

    const router = useRouter();
    const [list, setList] = useState<EmailListItem[]>(data.data);
    const [sendedlist, setSendedList] = useState<EmailListItem[]>(data2.data);
    const [email, setEmail] = useState("");
    const [sendemail, setSendEmail] = useState("");

    const groupedData = [];
    const groupedData2 = [];
    for (let i = 0; i < list.length; i += 5) {
        groupedData.push(list.slice(i, i + 5));
    }

    for (let i = 0; i < sendedlist.length; i += 5) {
        groupedData2.push(sendedlist.slice(i, i + 5));
    }

    const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchEmail = e.target.value.toLowerCase().trim();
        const filtered = data.data.filter(item =>
            item.email.toLowerCase().includes(searchEmail)
        );
        setList(filtered);
        setEmail(searchEmail);
    };

    const handleOnChangeSearch2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchEmail = e.target.value.toLowerCase().trim();
        const filtered = data2.data.filter(item =>
            item.email.toLowerCase().includes(searchEmail)
        );
        setSendedList(filtered);
        setSendEmail(searchEmail);
    };


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
                <>
                    <Tabs defaultValue="email_list">
                        <TabsList className="mx-4 sm:mx-0 ">
                            <TabsTrigger className="text-black hover:text-black cursor-pointer" value="email_list">Email List</TabsTrigger>
                            <TabsTrigger className="text-black hover:text-black cursor-pointer" value="sended_email_list">Sended Email List</TabsTrigger>
                        </TabsList>
                        <TabsContent value="email_list">
                            <div className="relative h-13  w-full sm:max-w-sm px-4 sm:px-0">
                                <label htmlFor="email-search" className="sr-only">
                                    Search email
                                </label>

                                <Search
                                    size={24}
                                    className="absolute left-7 sm:left-4  top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                />

                                <input
                                    id="email-search"
                                    type="text"
                                    name="search"
                                    value={email}
                                    onChange={handleOnChangeSearch}
                                    placeholder="Search email"
                                    autoComplete="off"
                                    inputMode="email"
                                    className="mb-5 w-full h-13 rounded-xl outline-none border border-[#787878] bg-transparent text-white pl-12 pr-4 placeholder:text-gray-400"
                                />
                            </div>
                            <ResponsiveMasonry
                                className="mb-5"
                                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                                gutterBreakPoints={{ 350: "12px", 750: "16px", 900: "24px" }}
                            >
                                <Masonry>
                                    {groupedData.map((group, groupIndex) => (
                                        <div
                                            key={groupIndex}
                                            className="space-y-4 mt-4 w-full"
                                        >
                                            <ListAdapter
                                                data={group}
                                                renderItem={(item, index) => (
                                                    <EMailCardItem
                                                        key={item.email}
                                                        {...item}
                                                        series={groupIndex * 5 + index + 1}
                                                        selected={(email: string) =>
                                                            selectList.some(
                                                                (i) => i.email.toLowerCase() === email.toLowerCase()
                                                            )
                                                        }
                                                        handleOnClick={handleEmail}
                                                    />
                                                )}
                                            />
                                            <p className="mt-4 text-sm text-[#787878] font-medium text-center">
                                                — End of 5 email group —
                                            </p>
                                        </div>
                                    ))}
                                </Masonry>
                            </ResponsiveMasonry>
                        </TabsContent>
                        <TabsContent value="sended_email_list">
                            <div className="relative h-13  w-full sm:max-w-sm px-4 sm:px-0">
                                <label htmlFor="email-search" className="sr-only">
                                    Search email
                                </label>

                                <Search
                                    size={24}
                                    className="absolute left-7 sm:left-4  top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                />

                                <input
                                    id="email-search"
                                    type="text"
                                    name="search"
                                    value={sendemail}
                                    onChange={handleOnChangeSearch2}
                                    placeholder="Search email"
                                    autoComplete="off"
                                    inputMode="email"
                                    className="mb-5 w-full h-13 rounded-xl outline-none border border-[#787878] bg-transparent text-white pl-12 pr-4 placeholder:text-gray-400"
                                />
                            </div>
                            <ResponsiveMasonry
                                className="mb-5"
                                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                                gutterBreakPoints={{ 350: "12px", 750: "16px", 900: "24px" }}
                            >
                                <Masonry>
                                    {groupedData2.map((group, groupIndex) => (
                                        <div
                                            key={groupIndex}
                                            className="space-y-4 mt-4 w-full"
                                        >
                                            <ListAdapter
                                                data={group}
                                                renderItem={(item, index) => (
                                                    <EMailCardItem
                                                        key={item.email}
                                                        {...item}
                                                        series={groupIndex * 5 + index + 1}
                                                        selected={(email: string) =>
                                                            selectList.some(
                                                                (i) => i.email.toLowerCase() === email.toLowerCase()
                                                            )
                                                        }
                                                        handleOnClick={handleEmail}
                                                    />
                                                )}
                                            />
                                            <p className="mt-4 text-sm text-[#787878] font-medium text-center">
                                                — End of 5 email group —
                                            </p>
                                        </div>
                                    ))}
                                </Masonry>
                            </ResponsiveMasonry>
                        </TabsContent>
                    </Tabs>
                </>
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
                <>
                    <Check onClick={handleOnDone} className="fixed bottom-5 right-5 rounded-full  size-12 p-2 cursor-pointer bg-white text-black shadow" />
                    <X onClick={handleOnCross} className="fixed bottom-20 right-5 rounded-full  size-12 p-2 cursor-pointer bg-white text-black shadow" />
                    <p className="fixed z-100 top-4 right-4 rounded-xl  size-10 p-2 cursor-pointer bg-white text-black shadow flex justify-center items-center font-medium">{selectList.length}</p>
                </>
            )}
            {selectList.length === 0 && (
                <Plus onClick={() => {
                    router.push("/new-record")
                }} className="fixed bottom-4 right-4 rounded-full size-12 p-2 cursor-pointer bg-white text-black shadow" />
            )}
        </>
    )
}

export default EmailContainer





