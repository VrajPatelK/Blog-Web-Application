import FFModal from "../Modals/FFModal";

const FFLabel = ({ followers, following }) => {
  //
  return (
    <div className="grid grid-cols-2 gap-2 rounded-md text-orange-50 text-lg font-medium h-fit border-green-500">
      <FFModal title="followers" data={followers}>
        <span
          className="bg-[orange-800] py-0.5 px-1 text-center rounded-md shadow-lg sm:text-base text-sm border"
          style={{
            background: "#FF6401",
            background: "linear-gradient(135deg, #FF6401, #F92A01)",
          }}
        >
          Followers : {followers.length}
        </span>
      </FFModal>
      <FFModal title="following" data={following}>
        <span
          className="bg-gray-50 py-0.5 px-1 text-center rounded-md shadow-lg sm:text-base text-sm border"
          style={{
            background: "#FF6401",
            background: "linear-gradient(135deg,#F92A01,  #FF6401)",
          }}
        >
          Following : {following.length}
        </span>
      </FFModal>
    </div>
  );
};

export default FFLabel;
