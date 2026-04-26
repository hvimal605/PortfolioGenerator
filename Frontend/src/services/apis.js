// const BASE_URL = "https://portfoliogenerator-otw0.onrender.com/api/v1"
// const BASE_URL = "http://localhost:5000/api/v1"

const BASE_URL = "https://portfoliogenerator-fbqk.onrender.com/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  GOOGLE_LOGIN_API: BASE_URL + "/auth/google-login",
  GOOGLE_SIGNUP_API: BASE_URL + "/auth/google-signup",

}

export const TemplateEndpoints = {
  GET_ALL_TEMPLATE_API: BASE_URL + "/template/getAllTemplate",
  TEMPLATE_DETAILS_BYID: BASE_URL + "/template/getTemplateById",
  CREATE_TEMPLATE_REQUEST: BASE_URL + "/template/createDeveloperTemplateRequest",
  CREATE_TEMPLATE: BASE_URL + "/template/createTemplate",

  GET_DEVELOPER_TEMPLATES: BASE_URL + "/template/getDevReqTemplates",
  GET_DEVELOPER_TEMPLATE_STATS: BASE_URL + "/template/getDevTemplateStats",
  GET_DEV_TEMPLATE_USAGE_STATS: BASE_URL + "/template/getDevTemplateUsage",
  GET_MONTHLY_REQUESTED_TEMPLATES: BASE_URL + "/template/getMonthlyReqTemplates",
  GET_TOP_USED_TEMPLATES: BASE_URL + "/template/getTopUsedTemplates",
  GET_ALL_REQUESTED_TEMPLATE_API: BASE_URL + "/template/getAllReqTemplates",
  REVIEW_TEMPLATE_REQUEST: BASE_URL + "/template/reviewDevTemplate",
  GET_ALL_PURCHASED_TEMPLATE: BASE_URL + "/template/getPurchasedTemplate"


}

export const TimelineEndpoints = {
  Create_Timeline: BASE_URL + "/timeline/createTimeline",
  Delete_Timeline: BASE_URL + "/timeline/deleteTimeline",
  UpdateTimeline_API: BASE_URL + "/timeline/updateTimeline",
}

export const skillEndpoints = {
  Add_Skill: BASE_URL + "/skill/addSkill",
  ADD_BULK_SKILLS: BASE_URL + "/skill/addBulkSkills",
  Delete_Skill: BASE_URL + "/skill/deleteSkill",
  UPDATE_SKILL_API_URL: BASE_URL + "/skill/updateSkill",
}

export const portfolioEndpoints = {
  GET_PORTFOLIO_FULL_DETAILS_BYID: BASE_URL + "/portfolio/getPortfolioFullDetails",
  CREATE_PORTFOLIO: BASE_URL + "/portfolio/createPortfolio",
  UPDATE_PORTFOLIO_DETAILS: BASE_URL + "/portfolio/updatePorfolioDetails",
  DEPLOY_PORTFOLIO: BASE_URL + "/deploy/deployPortfolio",
  GET_PORTFOIOS_FOR_USER: BASE_URL + "/portfolio/portfoliosForUser",
  GET_Portfolio_VisitorStats: BASE_URL + "/portfolio/getPortfolioVisitorStats",
  GET_ADMIN_DASHBOARD_STATS: BASE_URL + "/portfolio/getallstats",
  GET_USER_OR_PORTFOLIO_CREATION_DATA_MONTLY: BASE_URL + "/portfolio/getMonthlyStats",
}

export const SoftwareAppEndpoints = {
  ADD_SOFTWARE_APPLICATION: BASE_URL + "/softwareApplication/addsoftwareApplication",
  ADD_BULK_SOFTWARE_APPS_API: BASE_URL + "/softwareApplication/addBulkSoftwareApps",
  Delete_Software_Application: BASE_URL + "/softwareApplication/deletesoftwareApplication",
  UPDATE_SOFTWARE_APP_API_URL: BASE_URL + "/softwareApplication/updatesoftwareApplication",
}

export const projectEndpoints = {
  ADD_PROJECT: BASE_URL + "/project/addProject",
  Delete_Project: BASE_URL + "/project/deleteProject",
  UPDATE_PROJECT_API_URL: BASE_URL + "/project/updateProject",
}

export const messgaeEndPoints = {
  GET_ALL_MESSAGES: BASE_URL + "/message/getAllMessages",
  DELETE_MESSAGE: BASE_URL + "/message/deleteMessage",
  TOGGLE_EMAIL_NOTIFICATION: BASE_URL + "/message/toggleEmailNotification"
}

export const contactEndpoints = {
  SUBMIT_CONTACT_API: BASE_URL + "/contact/submit",
  GET_ALL_CONTACTS_API: BASE_URL + "/contact/all",
  DELETE_CONTACT_API: BASE_URL + "/contact/delete",
}


export const settingsEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/auth/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/auth/deleteProfile",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/auth/updateDisplayPicture",
  GET_USER_DETAILS_API: BASE_URL + "/auth/getUserDetails",
}


// user feature ENDPOINTS
export const userfeatureEndpoints = {
  TEMPLATE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  TEMPLATE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const aiEndpoints = {
  CONVERT_RESUME_API: BASE_URL + "/ai/convert-resume",
  GET_AI_USAGE_STATS_API: BASE_URL + "/ai/usage-stats",
}
