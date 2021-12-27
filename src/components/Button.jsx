export const Button = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-6 mr-4 bg-black hover:bg-4e7dd9 text-white leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-none transition-colors duration-200"
  >
    {children}
  </button>
);
