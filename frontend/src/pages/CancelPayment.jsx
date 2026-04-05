const CancelPayment = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-3xl border border-rose-100 px-6 py-8 sm:px-8 sm:py-10 text-center">
        {/* Icon circle */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
          <span className="text-3xl">❌</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-rose-700 mb-2">
          Payment Cancelled
        </h1>

        {/* Sub text */}
        <p className="text-sm sm:text-base text-slate-600 mb-6">
          Your payment was not completed. You can return to checkout and try again,
          or contact support if this was a mistake.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
