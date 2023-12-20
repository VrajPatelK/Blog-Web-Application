const RedBadge = ({ children, className }) => {
  return (
    <span
      className={
        "bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded " +
        className
      }
    >
      {children}
    </span>
  );
};

export default RedBadge;
