import { toast } from "sonner";
import { aiEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const { CONVERT_RESUME_API, GET_AI_USAGE_STATS_API } = aiEndpoints;

export const convertResume = async (resumeFile, token) => {
  const toastId = toast.loading("Analyzing resume...");
  let result = null;

  const formData = new FormData();
  formData.append("resume", resumeFile);

  try {
    const response = await apiConnector("POST", CONVERT_RESUME_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not parse resume.");
    }

    toast.success("Resume analyzed successfully!");
    result = response?.data?.data;
  } catch (error) {
    console.error("CONVERT_RESUME_API ERROR:", error);
    toast.error(error?.response?.data?.message || "Something went wrong during analysis.");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

export const getAIUsageStats = async (token) => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_AI_USAGE_STATS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch AI usage stats.");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_AI_USAGE_STATS_API ERROR:", error);
  }
  return result;
};
