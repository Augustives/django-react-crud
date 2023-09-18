import FormButton from "./form_button";

export default function Modal({ setOpenModal, text, onConfirm }) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-2 text-center">
              <p className="mt-2 text-xl text-gray-500">{text}</p>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setOpenModal(false)}
              >
                X
              </button>
              <FormButton
                text="Close"
                onClick={() => {
                  onConfirm();
                  setOpenModal(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
