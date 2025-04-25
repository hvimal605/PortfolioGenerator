import toast from "react-hot-toast";
import { messgaeEndPoints, portfolioEndpoints, projectEndpoints, skillEndpoints, SoftwareAppEndpoints, TimelineEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
  Create_Timeline,
  Delete_Timeline
} = TimelineEndpoints

const {
  Add_Skill,
  Delete_Skill,
  UPDATE_SKILL_API_URL
} = skillEndpoints

const {
  GET_PORTFOLIO_FULL_DETAILS_BYID,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO_DETAILS,
  DEPLOY_PORTFOLIO,
  GET_PORTFOIOS_FOR_USER,
  GET_Portfolio_VisitorStats,
  GET_ADMIN_DASHBOARD_STATS,
  GET_USER_OR_PORTFOLIO_CREATION_DATA_MONTLY
} = portfolioEndpoints

const {
  ADD_PROJECT,
  Delete_Project,
  UPDATE_PROJECT_API_URL
} = projectEndpoints

const { GET_ALL_MESSAGES , DELETE_MESSAGE ,TOGGLE_EMAIL_NOTIFICATION} = messgaeEndPoints


const { ADD_SOFTWARE_APPLICATION, Delete_Software_Application ,UPDATE_SOFTWARE_APP_API_URL } = SoftwareAppEndpoints


export const createTimeline = async (timelineData, token) => {
  const toastId = toast.loading("Adding Timeline...");

  // console.log("yeha sb dekhte h",timelineData,token)

  try {

    const response = await apiConnector("POST", Create_Timeline, timelineData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    // console.log("Timeline API Response:", response);

    // Correctly handling the response structure
    if (!response?.data?.success) {
      throw new Error("Could not add timeline.");
    }
    toast.success("Timeline added!")


  } catch (error) {
    console.error("CREATE_TIMELINE_API ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while adding the timeline");
  }

  toast.dismiss(toastId);

};

export const deleteTimeline = async ({ Timelineid, portfolioId, token }) => {
  const toastId = toast.loading("Deleting Timeline...");

  try {
    const response = await apiConnector("DELETE", Delete_Timeline, { Timelineid, portfolioId }, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("Delete Timeline Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete timeline.");
    }

    toast.success("Timeline deleted!");
    return true;

  } catch (error) {
    console.error("DELETE_TIMELINE_API ERROR:", error);
    toast.error(error.response.data.message|| "Something went wrong while deleting the timeline");
    return false;

  } finally {
    toast.dismiss(toastId);
  }
};



export const addSkill = async (skillData, token) => {
  const toastId = toast.loading("Adding Skill...");
  console.log("dekhte to kiya arah hai bhai ", skillData, token)

  try {
    const response = await apiConnector("POST", Add_Skill, skillData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("Add Skill API Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not add skill.");
    }

    toast.success("Skill added successfully!");
  } catch (error) {
    console.error("ADD_SKILL_API ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while adding the skill");
  }

  toast.dismiss(toastId);
};


export const deleteSkill = async ({ skillId, portfolioId, token }) => {
  const toastId = toast.loading("Deleting Skill...");

  try {
    const response = await apiConnector(
      "DELETE",
      Delete_Skill,
      { Skillid: skillId, portfolioId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("Delete Skill Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete skill.");
    }

    toast.success("Skill deleted!");
    return true;

  } catch (error) {
    console.error("DELETE_SKILL_API ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while deleting the skill");
    return false;

  } finally {
    toast.dismiss(toastId);
  }
};

export const updateSkill = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Updating skill...");

  try {
    // Send the API request to update the skill with FormData
    const response = await apiConnector("PUT", UPDATE_SKILL_API_URL, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("UPDATE_SKILL API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Failed to update skill");
    }

    toast.success(response.data.message || "Skill updated successfully");
    result = response.data;
  } catch (error) {
    console.error("UPDATE_SKILL ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while updating skill");
  }

  toast.dismiss(toastId);
  return result;
};






export const addSoftwareApplication = async (softwareData, token) => {
  const toastId = toast.loading("Adding Software Application...");
  // console.log("dekhte to kiya arah hai bhai ", softwareData, token)

  try {
    const response = await apiConnector("POST", ADD_SOFTWARE_APPLICATION, softwareData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("Add Software app API Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not add Software app.");
    }

    toast.success("Software application  added successfully!");
  } catch (error) {
    console.error("ADD_SOFTWARE_APP_API ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while adding the Software app");
  }

  toast.dismiss(toastId);
};

export const deleteSoftwareApp = async ({ softwareId, portfolioId, token }) => {
  const toastId = toast.loading("Deleting Software Application...");

  try {
    const response = await apiConnector(
      "DELETE",
      Delete_Software_Application, 
      { applicationId: softwareId, portfolioId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("Delete Software Application Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete software application.");
    }

    toast.success("Software Application deleted!");
    return true;

  } catch (error) {
    console.error("DELETE_SOFTWARE_APP_API ERROR:", error);
    toast.error(error.response.data.message|| "Something went wrong while deleting the software application");
    return false;

  } finally {
    toast.dismiss(toastId);
  }
};

export const updateSoftwareApp = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Updating software application...");

  try {
    // Send the API request to update the software application with FormData
    const response = await apiConnector("PUT", UPDATE_SOFTWARE_APP_API_URL, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("UPDATE_SOFTWARE_APP API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Failed to update software application");
    }

    toast.success(response.data.message || "Software application updated successfully");
    result = response.data;
  } catch (error) {
    console.error("UPDATE_SOFTWARE_APP ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while updating the software application");
  }

  toast.dismiss(toastId);
  return result;
};


export const addProject = async (projectData, token) => {
  const toastId = toast.loading("Adding Project ...");

  try {
    const response = await apiConnector("POST", ADD_PROJECT, projectData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("Add PROJECT API Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not add Project.");
    }

    toast.success("Project added successfully!");
  } catch (error) {
    console.error("ADD_PROJECT_API ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while adding the Project");
  }

  toast.dismiss(toastId);
};



export const deleteProject = async ({ projectId, portfolioId, token }) => {
  const toastId = toast.loading("Deleting Project...");

  try {
    const response = await apiConnector(
      "DELETE",
      Delete_Project, // Make sure this is correctly imported and points to the right endpoint
      { ProjectId: projectId, portfolioId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("Delete Project Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not delete project.");
    }

    toast.success("Project deleted!");
    return true;

  } catch (error) {
    console.error("DELETE_PROJECT_API ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while deleting the project");
    return false;

  } finally {
    toast.dismiss(toastId);
  }
};

export const updateProject = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Updating project...");

  try {
    // Send the API request to update the project with FormData
    const response = await apiConnector("PUT", UPDATE_PROJECT_API_URL, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("UPDATE_PROJECT API RESPONSE: ", response);

    if (!response?.data?.success) {
      throw new Error("Failed to update project");
    }

    toast.success(response.data.message || "Project updated successfully");
    result = response.data;
  } catch (error) {
    console.error("UPDATE_PROJECT ERROR: ", error);
    toast.error(error.response.data.message || "Something went wrong");
  }

  toast.dismiss(toastId);
  return result;
};




export const addPersonalDetails = async (personalData, token) => {
  let result = null
  const toastId = toast.loading("Adding Personal Deatails ...");

  try {
    const response = await apiConnector("POST", CREATE_PORTFOLIO, personalData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("Add PERSONAL DETAILS API Response:", response);


    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not add Personal details.");
    }

    toast.success("Personal details added successfully!");
    result = response?.data?.portfolio

  } catch (error) {
    console.error("PERSONAL_DETAILS_API ERROR:", error);
    toast.error(error.response.data.message || "Something went wrong while adding the Personal details");
  }

  toast.dismiss(toastId);
  return result
};

export const updatePortfolioDetails = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Updating portfolio...");

  try {
    // Send the API request to update the portfolio with FormData
    const response = await apiConnector("PUT",UPDATE_PORTFOLIO_DETAILS , formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("UPDATE_PORTFOLIO_DETAILS RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Failed to update portfolio");
    }

    toast.success(response.data.message || "Portfolio updated successfully");
    result = response.data;
  } catch (error) {
    console.error("UPDATE_PORTFOLIO_DETAILS ERROR:", error);
    toast.error(error.response.data.message|| "Something went wrong while updating portfolio");
  }

  toast.dismiss(toastId);
  return result;
};




export const getFullDetailsOfPortfolio = async (portfolioId, token) => {
  const toastId = toast.loading("Loading...")

  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_PORTFOLIO_FULL_DETAILS_BYID,
      {
        portfolioId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("PORTFOLIO_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("PORTFOLIO_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
  }
  toast.dismiss(toastId)
  return result
}


export const deployPortfolio = async (portfolioData, token) => {
  let result = null
  const toastId = toast.loading("Deploying Portfolio...");


  try {
    const response = await apiConnector("POST", DEPLOY_PORTFOLIO, portfolioData, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    console.log("Deploy Portfolio API Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Portfolio deployment failed.");
    }

    toast.success("Portfolio deployed successfully!");
    result = response?.data;
  } catch (error) {
    console.error("DEPLOY_PORTFOLIO_API ERROR:", error);
    toast.error(error.response.data.message|| "Something went wrong while deploying the portfolio.");
  }
  toast.dismiss(toastId);
  return result
};


export const getPortfoliosForUser = async (token) => {
  const toastId = toast.loading("Loading...")

  let result = null
  try {
    const response = await apiConnector("GET", GET_PORTFOIOS_FOR_USER, null,

      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("PORTFOLIOS_FOR_USER_API RESPONSE............", response.data)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data
  } catch (error) {
    console.log("PORTFOLIOS_FOR_USER_API  ERROR............", error)
    result = error.response.data
  }
  toast.dismiss(toastId)
  return result
}

export const getPortfolioVisitorStats = async (portfolioId, token) => {
  // const toastId = toast.loading("Loading...");

  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_Portfolio_VisitorStats,
      { portfolioId },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("GET_Portfolio_VisitorStats_API RESPONSE............", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data;
  } catch (error) {
    console.log("GET_Portfolio_VisitorStats_API ERROR............", error);
    result = error?.response?.data || { success: false, message: "Something went wrong!" };
  }

  // toast.dismiss(toastId);
  return result;
};


export const getAllMessages = async (portfolioId, token) => {
  // const toastId = toast.loading("Loading...");

  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_ALL_MESSAGES,
      { portfolioId },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log(" GET_ALL_MESSAGES_API RESPONSE............", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data;
  } catch (error) {
    console.log(" GET_ALL_MESSAGES_API ERROR............", error);
    result = error?.response?.data || { success: false, message: "Something went wrong!" };
  }

  // toast.dismiss(toastId);
  return result;
};


export const deleteMessage = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_MESSAGE, data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    })
    console.log(" DELETE_MESSAGE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Message")
    }
    toast.success("Message Deleted")
    result = response.data;
  } catch (error) {
    console.log("DELETE Message API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



export const updateEmailNotificationStatus = async (portfolioId, token) => {
  let result = null;
  const toastId = toast.loading("Updating preferences...");

  try {
    const response = await apiConnector("POST", TOGGLE_EMAIL_NOTIFICATION, {portfolioId}, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    console.log("TOGGLE_EMAIL_NOTIFICATION API RESPONSE: ", response);

    if (!response?.data?.success) {
      throw new Error("Failed to update email notification status");
    }

    toast.success(response.data.message || "Updated successfully");
    result = response.data;
  } catch (error) {
    console.error("TOGGLE_EMAIL_NOTIFICATION ERROR: ", error);
    toast.error(error.response.data.message || "Something went wrong");
  }

  toast.dismiss(toastId);
  return result;
};


export const getAdminDashboardStats = async (token) => {
  const toastId = toast.loading("Fetching dashboard stats...")

  let result = null
  try {
    const response = await apiConnector(
      "GET",
      GET_ADMIN_DASHBOARD_STATS,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("GET_ADMIN_DASHBOARD_STATS RESPONSE:", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response?.data?.data
  } catch (error) {
    console.log("GET_ADMIN_DASHBOARD_STATS ERROR:", error)
    result = error?.response?.data
    toast.error(error?.response?.data?.message || "Failed to fetch dashboard stats")
  }

  toast.dismiss(toastId)
  return result
}


export const getMonthlyUserDeveloperPortfolioStats = async (token) => {
  try {
    const res = await apiConnector("GET", GET_USER_OR_PORTFOLIO_CREATION_DATA_MONTLY, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!res?.data?.success) throw new Error("Failed to fetch monthly stats");
    return res.data.data; // array of { month, users, developers, portfolios }
  } catch (err) {
    console.error("MONTHLY_STATS_ERROR:", err);
    return [];
  }
};
