import { toast } from "sonner";
import { userfeatureEndpoints } from "../apis";
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import { apiConnector } from "../apiConnector";
import { getUserDetails } from "./SettingApi";

const { TEMPLATE_PAYMENT_API, TEMPLATE_VERIFY_API } = userfeatureEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function buyPremiumTemplate(token, templates, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading Payment...");
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      toast.dismiss(toastId);
      return;
    }

    const orderResponse = await apiConnector("POST", TEMPLATE_PAYMENT_API, { templates }, {
      Authorization: `Bearer ${token}`,
    });

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "PortfolioCraft",
      description: "Purchase Premium Template",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: async function (response) {
        const verifyRes = await apiConnector("POST", TEMPLATE_VERIFY_API, {
          ...response,
          templates,
        }, {
          Authorization: `Bearer ${token}`,
        });

        if (verifyRes.data.success) {
          toast.success("Payment successful! Template unlocked.");
          
          // ✅ Official Sync with Backend (Single source of truth)
          dispatch(getUserDetails(token, navigate));

          navigate("/UserDas", { state: { activeTab: "My Templates" } });
        } else {
          toast.error("Payment verification failed");
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment failed");
    });

  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong during payment";
    toast.error(errorMessage);
  }
  toast.dismiss(toastId);
}
