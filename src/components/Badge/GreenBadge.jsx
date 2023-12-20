const GreenBadge = ({ children }) => {
  return (
    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
      {children}
    </span>
  );
};

export default GreenBadge;
