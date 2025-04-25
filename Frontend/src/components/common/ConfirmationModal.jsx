export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-opacity-40 backdrop-blur-md">
      <div className="w-11/12 max-w-[420px] rounded-2xl border border-[#2a2a2f] bg-[#121212] p-8 shadow-2xl transition-all duration-500 ease-in-out transform scale-100 hover:scale-105">
        
        <p className="text-3xl font-semibold text-gray-100 text-center animate__animated animate__fadeIn">
          {modalData?.text1}
        </p>

        <p className="mt-4 mb-6 text-gray-300 text-center leading-6 animate__animated animate__fadeIn animate__delay-1s">
          {modalData?.text2}
        </p>

        <div className="flex justify-center gap-4 mt-6">
          {/* Render btn1 if btn1Text exists */}
          {modalData?.btn1Text && (
            <button
              className="rounded-lg bg-gradient-to-br from-[#6f00ff] via-[#9a00f5] to-[#00c6ff] py-3 px-6 font-medium text-white shadow-lg hover:scale-105 transition-all duration-300"
              onClick={modalData?.btn1Handler}
            >
              {modalData?.btn1Text}
            </button>
          )}

          {/* Render btn2 if btn2Text exists */}
          {modalData?.btn2Text && (
            <button
              className="rounded-lg bg-[#333333] py-3 px-6 font-medium text-gray-200 hover:bg-[#444444] transition-all duration-300 hover:scale-105"
              onClick={modalData?.btn2Handler}
            >
              {modalData?.btn2Text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
