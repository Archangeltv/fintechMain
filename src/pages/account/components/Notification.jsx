import React, { useRef, useEffect, useState } from "react";
import Logo from "../../../components/ui/Logo";
import { TweenMax, Power3 } from "gsap";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../../../components/ui/Container";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const Notification = (props) => {
  let item = useRef(null);
  const [active, setActive] = useState(true);
  const [data, setData] = useState(null);
  const [notif, setNotif] = useState(null);
  const [docRef, setDocref] = useState(null);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user?.email}`), (doc1) => {
      setData(doc1.data());
      setNotif(doc1.data()?.notification);
      setDocref(doc(db, "user", user?.email));
    });
  }, [user?.email, user, data?.amount]);

  function handleRead(item) {
    const index = notif.findIndex((id) => {
      return id.id === item.id;
    });

    setNotif((prev) => {
      const newNotif = [...prev];
      newNotif[index] = {
        ...newNotif[index],
        read: true,
      };
      return newNotif;
    });

    const newNotif = [...data?.notification];
    newNotif[index] = {
      ...newNotif[index],
      read: true,
    };

    const format = {
      notification: newNotif,
    };

    if (item.read !== false) {
      return;
    }

    updateDoc(docRef, format);
  }

  useEffect(() => {
    TweenMax.to(item, 0.3, {
      css: {
        right: 0,
      },
      ease: Power3.easeInOut,
    });

    setActive(false);

    if (active) {
      TweenMax.to(item, 0.3, {
        css: {
          right: -1000,
        },
        ease: Power3.easeInOut,
      });
    } else {
      TweenMax.to(item, 0.3, {
        css: {
          right: 0,
        },
        ease: Power3.easeInOut,
      });
    }
  }, [item, active, props]);

  return (
    <div
      ref={(el) => {
        item = el;
      }}
      className="w-full right-[-100%] z-[100000] absolute   min-h-screen"
    >
      <Container className="w-full">
        <main className=" w-full my-5 mb-20 padding">
          <Link to="/account">
            <div className="flex text-2xl justify-between">
              <h1 className="font-medium">Notifications</h1>
              <FaTimes />
            </div>
          </Link>
          <p className="text-sm mt-1.5">
            (Click each notification to mark it as read)
          </p>
          <section className="mt-5 flex gap-5 flex-col-reverse">
            {data?.notification?.length < 1 &&
              "You have no Notifications, Kindly interact with the app."}
            {data?.notification?.map((item) => {
              return (
                <div onClick={() => handleRead(item)} key={item.id}>
                  <div
                    className={`border p-5 rounded-lg cursor-pointer ${
                      item.read
                        ? "border-gray-600 "
                        : "border-green-600 border-2"
                    }`}
                  >
                    <p className="font-medium">
                      You {item.type == "sent" ? "sent" : "recieved"} $
                      {Number(item.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {item.type == "sent" ? "to" : "from"} {item.name}
                    </p>
                    <p className="text-sm mt-3">
                      {" "}
                      {item.time.toDate().toLocaleString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </Container>
      <Logo color="text-text" size="w-12" text="text-3xl" />
    </div>
  );
};

export default Notification;
