import api from "../../../api/axios";
import { EmailListResponse, EmailMessageListResponse, NewRecordEmailPayload } from "../type/type";

export const getEmailList = async (): Promise<EmailListResponse | null> => {
    try {
        const response = await api.get("/email_list");
        if (response.status === 200) {
            return response.data;
        }

        return null;

    } catch (error) {
        console.error(error);
        return null;

    }
}

export const addNewRecord = async (payload: NewRecordEmailPayload) => {
    try {
        const response = await api.post("/add_new_record", payload);
        if (response.status === 200 || response.status === 201) {
            return true;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateEmail = async (email: string) => {
    try {
        const response = await api.post("/update_email_list", { email });
        if (response.status === 201) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getEmailMessageList = async (): Promise<EmailMessageListResponse | null> => {
    try {
        const response = await api.get("/email_message_list");
        if (response.status === 200) {
            return response.data;
        }
        return null;

    } catch (error) {
        console.error(error);
        return null;

    }
}

export const sendMail = async (email: string, subject: string, content: string, name: string, company: string) => {
    try {
        const response = await api.post("/send-email", {
            email: email,
            subject: subject,
            content: content,
            name: name,
            company: company,
        });
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
        return null;

    } catch (error) {
        console.error(error);
        return null;

    }
}
