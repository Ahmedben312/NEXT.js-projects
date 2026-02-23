import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";
import { GET_SELLER_DATA } from "../../utils/constants";

function Index() {
  const [cookies] = useCookies();
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(undefined);

  useEffect(() => {
    const getSellerDashboardData = async () => {
      try {
        const response = await axios.get(GET_SELLER_DATA, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        if (response.status === 200) {
          setDashboardData(response.data.dashboardData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (userInfo && cookies.jwt) {
      getSellerDashboardData();
    }
  }, [userInfo, cookies.jwt]);

  const handleBecomeASeller = () => {
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  if (!userInfo) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#1DBF73]">
            Become a Seller
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Start earning by offering your skills and services to thousands of
            buyers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Create Gigs</h3>
              <p className="text-gray-600">
                Set your own rates and create service packages
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Grow Income</h3>
              <p className="text-gray-600">
                Increase your earnings with more clients
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Build Reputation</h3>
              <p className="text-gray-600">
                Get reviews and build your seller profile
              </p>
            </div>
          </div>
          <button
            onClick={handleBecomeASeller}
            className="bg-[#1DBF73] text-white py-4 px-12 rounded-lg text-xl font-semibold hover:bg-[#15a356] transition-all duration-300"
          >
            Join as a Seller Today
          </button>
          <p className="text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => {
                dispatch({
                  type: reducerCases.TOGGLE_LOGIN_MODAL,
                  showLoginModal: true,
                });
              }}
              className="text-[#1DBF73] font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {userInfo && (
        <div className="flex min-h-[80vh] my-10 mt-0 px-32 gap-5">
          <div className="shadow-md h-max p-10 flex flex-col gap-5 min-w-96 w-96">
            <div className="flex gap-5 justify-center items-center">
              <div>
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
                    <span className="text-5xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[#62646a] text-lg font-medium">
                  {userInfo.username}
                </span>
                <span className="font-bold text-md">{userInfo.fullName}</span>
              </div>
            </div>

            <div className="border-t py-5">
              <p>{userInfo.description}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-10 w-full">
              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/gigs")}
              >
                <h2 className="text-xl">Total Gigs</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                  {dashboardData?.gigs || 0}
                </h3>
              </div>

              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/orders")}
              >
                <h2 className="text-xl">Total Orders</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                  {dashboardData?.orders || 0}
                </h3>
              </div>

              <div
                className="shadow-md h-max p-10 flex flex-nowrap flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/unread-messages")}
              >
                <h2 className="text-xl"> Unread Messages</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                  {dashboardData?.unreadMessages || 0}
                </h3>
              </div>

              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl">Earnings Today</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                  ${dashboardData?.dailyRevenue || 0}
                </h3>
              </div>

              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl">Earnings Monthly</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                  ${dashboardData?.monthlyRevenue || 0}
                </h3>
              </div>

              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl">Earnings Yearly</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold">
                  ${dashboardData?.revenue || 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
