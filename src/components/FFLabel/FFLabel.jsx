import FFModal from "../Modals/FFModal";

const FFLabel = ({ followers, following }) => {
  //
  return (
    <div className="grid grid-cols-2 gap-2 rounded-md text-orange-50 text-lg font-medium h-fit border-green-500">
      <FFModal title="followers" data={followers}>
        <div
          className="p-2 rounded-md sm:text-base text-orange-500 text-base font-semibold hover:bg-orange-50"
          style={{}}
        >
          Followers : {followers.length}
        </div>
      </FFModal>
      <FFModal title="following" data={following}>
        <div
          className="p-2 rounded-md sm:text-base text-orange-500 text-base font-semibold hover:bg-orange-50"
          style={{}}
        >
          Following : {following.length}
        </div>
      </FFModal>
    </div>
  );
};

export default FFLabel;
