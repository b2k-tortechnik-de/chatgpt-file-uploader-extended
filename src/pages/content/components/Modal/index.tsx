import { useEffect } from "react";
import CloseIcon from "../Icons/CloseIcon";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const Modal = ({ title, children, openModal, setOpenModal }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpenModal]);

  return (
    <>
      {openModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 9999 }}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay, show/hide based on modal state. */}
            <div
              className="fixed inset-0 bg-gray-500/90 dark:bg-gray-800/90 transition-opacity"
              aria-hidden="true"
              onClick={() => setOpenModal(false)}
            />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* Modal panel, show/hide based on modal state. */}
            <div
              className="relative col-auto col-start-2 row-auto row-start-2 w-full rounded-lg text-left shadow-xl transition-all left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{ maxWidth: "80vw", maxHeight: "90vh", top: "6vh" }}
            >
              <div className="gap-2 px-4 pb-4 pt-5 sm:p-6 flex items-center justify-between border-b border-black/10 dark:border-white/10 ">
                <h3 className="text-lg leading-6 font-medium text-gray-600 dark:text-gray-300">
                  {title}
                </h3>
                <div
                  className="flex flex-col items-start justify-start gap-2"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <a
                    href="https://www.buymeacoffee.com/aliburakozden"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
                      alt="Buy Me A Coffee"
                      style={{
                        height: 40,
                        width: 140,
                        objectFit: "contain",
                      }}
                    />
                  </a>
                  {/* <span className="text-gray-600 dark:text-gray-300 text-xs">
                    If you like this tool, you can support me with a coffee ☕
                  </span> */}
                </div>
                <button
                  className="text-gray-500 hover:opacity-80 transition-all"
                  onClick={() => setOpenModal(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="relative mt-2 w-full h-full p-4 overflow-y-scroll">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
