"use client";

import { React, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar/Navbar";
import AllFeedbacks from "../../components/AllFeedbacks/AllFeedbacks";

const Feedbacks = () => {
  // const [userAuthorized, setUserAuthorized] = useState(false);
  // const router = useRouter();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = Cookies.get("token");
  //       await axios
  //         .get("http://localhost:3333/user/authenticateUser", {
  //           headers: {
  //             Authorization: `bearer ${token} 1710488203993`,
  //           },
  //         })
  //         .then((response) => {
  //           console.log(response.status);
  //           if (response.status === 200 && response.data.role === "admin") {
  //             console.log("authorized");
  //             setUserAuthorized(true);
  //           } else {
  //             router.push("/unauthorized");
  //           }
  //         })
  //         .catch((error) => {
  //           router.push("/unauthorized");
  //         });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData(); // Call the fetchData function
  // }, []);

  return (
    <>
      {/* {userAuthorized && (
        <>
          <Navbar selectedLink={"All Feedbacks"} type={"admin"} />
          <AllFeedbacks />
        </>
      )} */}
      <h1>User</h1>
    </>
  );
};

export default Feedbacks;