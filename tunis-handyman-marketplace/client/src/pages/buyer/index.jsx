import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useStateProvider } from "../../context/StateContext";
import { GET_BUYER_ORDERS } from "../../utils/constants";

function Index() {
  const [cookies] = useCookies();
  const [{ userInfo }] = useStateProvider();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
      return;
    }
  }, [userInfo, router]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(GET_BUYER_ORDERS, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };

    if (userInfo && cookies.jwt) {
      getOrders();
    }
  }, [userInfo, cookies.jwt]);

  // Add console logs to debug dynamic data
  useEffect(() => {
    console.log("Orders:", orders);
    console.log("User Info:", userInfo);
  }, [orders, userInfo]);

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
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold">Welcome</h3>
                <p className="text-base">{userInfo.email}</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/profile")}
              className="bg-[#1DBF73] text-white py-3 px-9 rounded-lg w-full font-medium cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
          <div className="flex-1">
            <div className="shadow-md p-10">
              <h2 className="text-3xl font-bold mb-5">Your Orders</h2>
              {orders.length > 0 ? (
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-800">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Service Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(({ id, gig, status, price }) => (
                        <tr
                          key={id}
                          className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => router.push(`/gig/${gig.id}`)}
                        >
                          <th scope="row" className="px-6 py-4 font-medium">
                            {gig.title
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")}
                          </th>
                          <td className="px-6 py-4">${price}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {status?.charAt(0).toUpperCase() +
                                status
                                  ?.slice(1)
                                  .replace(/</g, "&lt;")
                                  .replace(/>/g, "&gt;")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <button
                    onClick={() => router.push("/search")}
                    className="bg-[#1DBF73] text-white py-2 px-6 rounded-lg font-medium"
                  >
                    Browse Services
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
