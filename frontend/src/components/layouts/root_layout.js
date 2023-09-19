import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/user_hook";

import Modal from "../elements/modal";

const RootLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const { error } = useAuth();

  useEffect(() => {
    if (error) {
      setShowModal(true);
    }
  }, [error]);

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <main className="min-h-[100dvh] flex flex-col content-center justify-center items-center">
          <Outlet />
          {showModal && (
            <Modal
              text={JSON.stringify(error, null, 2)}
              setOpenModal={setShowModal}
            />
          )}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
