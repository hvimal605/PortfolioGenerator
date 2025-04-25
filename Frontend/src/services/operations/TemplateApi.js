import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { TemplateEndpoints } from "../apis"

const {
   GET_ALL_TEMPLATE_API,
   TEMPLATE_DETAILS_BYID,
   CREATE_TEMPLATE_REQUEST,
   CREATE_TEMPLATE,
   GET_DEVELOPER_TEMPLATES,
   GET_DEVELOPER_TEMPLATE_STATS,
   GET_DEV_TEMPLATE_USAGE_STATS,
   GET_MONTHLY_REQUESTED_TEMPLATES,
   GET_TOP_USED_TEMPLATES,
   GET_ALL_REQUESTED_TEMPLATE_API,
   REVIEW_TEMPLATE_REQUEST
  } = TemplateEndpoints

  export const getAllTemplates = async () => {
    // const toastId = toast.loading("Loading...");
    let result = [];
  
    try {
      const response = await apiConnector("GET", GET_ALL_TEMPLATE_API);
    //   console.log("ye hai ji response", response);
  
      // Correct property access
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Templates");
      }
  
      // Fixing the correct response data structure
      result = response?.data?.templates || []; // Ensure it's an array
  
    } catch (error) {
      console.error("GET_ALL_TEMPLATE_API API ERROR:", error);
      toast.error(error.message || "Something went wrong while fetching templates");
    }
  
    // toast.dismiss(toastId);
    return result;
  };
  

export const fetchTemplateDetailsById = async (templateid) => {
    const toastId = toast.loading("Loading...")
  
    let result = null
    try {
      const response = await apiConnector("POST",TEMPLATE_DETAILS_BYID , {
        templateid,
      })
      console.log("Template_DETAILS_API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log(" Template_DETAILS_API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result
  }


export const createTemplateRequest = async (formData, token) => {
  const toastId = toast.loading("Uploading your template...");

  try {
    const requestData = new FormData();
    requestData.append("name", formData.name);
    requestData.append("description", formData.description);
   
    requestData.append("zipFile", formData.zipFile); // ZIP file here

    const response = await apiConnector("POST", CREATE_TEMPLATE_REQUEST, requestData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("TEMPLATE UPLOAD RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Upload failed");
    }

    toast.success("Template uploaded successfully!");
    return response.data;
  } catch (error) {
    console.error("UPLOAD_TEMPLATE_API ERROR:", error);
    toast.error(error.message || "Failed to upload template");
  } finally {
    toast.dismiss(toastId);
  }
};

export const createTemplate = async (formData, token) => {
  const toastId = toast.loading("Creating template...");

  try {
    const response = await apiConnector(
      "POST",
      CREATE_TEMPLATE,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("TEMPLATE UPLOAD RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Upload failed");
    }

    toast.success("Template uploaded successfully!");
    return response.data;
  } catch (error) {
    console.error("UPLOAD_TEMPLATE_API ERROR:", error);
    toast.error(error.message || "Failed to upload template");
  } finally {
    toast.dismiss(toastId);
  }
};



export const getDeveloperTemplates = async (token) => {
  

  try {
    const response = await apiConnector("GET", GET_DEVELOPER_TEMPLATES, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Failed to fetch requested templates.");
    }

    toast.success("Templates fetched!");
    return response.data.templates;
  } catch (error) {
    console.error("GET_DEVELOPER_TEMPLATES_API ERROR:", error);
    toast.error(error.message || "Unable to fetch templates");
    return [];
  }
};

export const getDeveloperTemplateStats = async (token) => {
 

  try {
    const response = await apiConnector("GET", GET_DEVELOPER_TEMPLATE_STATS, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Failed to fetch template stats.");
    }

    return response.data.data;
  } catch (error) {
    console.error("GET_DEVELOPER_TEMPLATE_STATS_API ERROR:", error);
   
    return {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    };
  } 
};

export const getDeveloperTemplateUsageStats = async (token) => {
  
  try {
    const res = await apiConnector("GET", GET_DEV_TEMPLATE_USAGE_STATS, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!res?.data?.success) throw new Error("Couldn't fetch stats");

    return res.data.stats;
  } catch (err) {
    console.error("USAGE_STATS_ERROR:", err);
 
    return [];
  } 
};

export const getMonthlyRequestedTemplates = async (token) => {
 
  try {
    const res = await apiConnector("GET", GET_MONTHLY_REQUESTED_TEMPLATES, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!res?.data?.success) throw new Error("Failed to fetch monthly data");

    return res.data.data;
  } catch (err) {
    console.error("MONTHLY_REQ_TEMPLATE_ERROR:", err);
    
    return [];
  } 
};


export const getTopUsedTemplates = async (token) => {
  try {
    const res = await apiConnector("GET", GET_TOP_USED_TEMPLATES, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!res?.data?.success) throw new Error("Failed to fetch top used templates");

    return res.data.data;
  } catch (err) {
    console.error("TOP_USED_TEMPLATE_ERROR:", err);
    return [];
  }
};

export const getAllRequestedTemplates = async (token) => {
  const toastId = toast.loading("Loading requested templates...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_ALL_REQUESTED_TEMPLATE_API, null, {
      Authorization: `Bearer ${token}`,
    });
   

    if (!response?.data?.success) {
      throw new Error("Could not fetch requested templates");
    }

    result = response?.data?.templates || [];
  } catch (error) {
    console.error("GET_ALL_REQUESTED_TEMPLATE_API ERROR:", error);
    toast.error(error.message || "Something went wrong while fetching requested templates");
  }

  toast.dismiss(toastId);
  return result;
};

export const reviewTemplateRequest = async (templateId, action, token) => {
  const toastId = toast.loading(`${action} in progress...`);

  try {
    const response = await apiConnector("POST", REVIEW_TEMPLATE_REQUEST, {
      templateId,
      action,
    }, {
      Authorization: `Bearer ${token}`,
    });

    console.log("REVIEW TEMPLATE RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Review failed");
    }

    toast.success(`Template ${action} successfully!`);
    return response.data;
  } catch (error) {
    console.error("REVIEW_TEMPLATE_API ERROR:", error);
    toast.error(error.message || "Failed to review template");
  } finally {
    toast.dismiss(toastId);
  }
};