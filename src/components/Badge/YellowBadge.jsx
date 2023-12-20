const YellowBadge = ({ children }) => {
  return (
    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
      {children}
    </span>
  );
};

export default YellowBadge;
