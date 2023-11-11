function Button({
  onClick,
  Title,
  isLoading,
  background = "bg-[#FCE09B]",
  witdh = "w-1/3",
  textColor = "text-slate-700",
}) {
  if (isLoading) {
    return (
      <button
        className="px-5 py-2 rounded-sm mx-auto bg-slate-400 text-slate-100 font-medium hover:bg-opacity-80  w-max h-max hover:cursor-not-allowed"
        onClick={onClick}
      >
        Loading...
      </button>
    );
  }
  return (
    <button
      className={`px-5 py-2 rounded-sm mx-auto  font-semibold hover:bg-opacity-80 h-max ${background} ${witdh} ${textColor}`}
      onClick={onClick}
    >
      {Title}
    </button>
  );
}
export default Button;
