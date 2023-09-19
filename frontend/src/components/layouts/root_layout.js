import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth_hook";

import Modal from "../elements/modal";

const RootLayout = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const { error } = useAuth();

  useEffect(() => {
    if (error) {
      setShowModal(true);
    }
  }, [error]);

  return (
    <main className="min-h-[100dvh] flex flex-col content-center justify-center items-center">
      {children}
      {showModal && (
        <Modal
          text={JSON.stringify(error, null, 2)}
          setOpenModal={setShowModal}
        />
      )}
    </main>
  );
};

export default RootLayout;
