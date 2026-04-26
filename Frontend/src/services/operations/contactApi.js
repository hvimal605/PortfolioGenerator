import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { contactEndpoints } from "../apis";

const { SUBMIT_CONTACT_API, GET_ALL_CONTACTS_API, DELETE_CONTACT_API } = contactEndpoints;

export const submitPlatformContact = async (data) => {
    let result = false;
    const toastId = toast.loading("Sending message...");
    try {
        const response = await apiConnector("POST", SUBMIT_CONTACT_API, data);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success(response.data.message || "Message sent successfully!");
        result = true;
    } catch (error) {
        console.log("SUBMIT_CONTACT_API ERROR............", error);
        toast.error(error.response?.data?.message || "Could not send message. Please try again.");
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllPlatformContacts = async (token) => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_CONTACTS_API, null, {
            Authorization: `Bearer ${token}`
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data;
    } catch (error) {
        console.log("GET_ALL_CONTACTS_API ERROR............", error);
        toast.error(error.response?.data?.message || "Failed to fetch platform messages");
    }
    return result;
}

export const deletePlatformContact = async (messageId, token) => {
    let result = false;
    const toastId = toast.loading("Deleting message...");
    try {
        const response = await apiConnector("DELETE", DELETE_CONTACT_API, { messageId }, {
            Authorization: `Bearer ${token}`
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success(response.data.message || "Message deleted successfully!");
        result = true;
    } catch (error) {
        console.log("DELETE_CONTACT_API ERROR............", error);
        toast.error(error.response?.data?.message || "Failed to delete message");
    }
    toast.dismiss(toastId);
    return result;
}
