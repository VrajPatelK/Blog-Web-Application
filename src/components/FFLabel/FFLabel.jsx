import FFModal from "../Modals/FFModal";

const FFLabel = (props) => {
  //
  var followers = props?.followers;
  var following = props?.following;

  //
  return (
    <div className="grid grid-cols-2 gap-2 rounded-md text-orange-50s h-fit border-green-500">
      <FFModal
        title="followers"
        data={followers}
        userId={props.userId}
        publisherId={props.publisherId}
        onRemoveff={(recordId) => props.onRemoveff(recordId)}
      >
        <div
          className="p-2 rounded-md text-orange-500 text-sm font-medium hover:bg-orange-50"
          style={{}}
        >
          Followers : {followers.length}
        </div>
      </FFModal>
      <FFModal
        title="following"
        data={following}
        userId={props.userId}
        publisherId={props.publisherId}
        onRemoveff={(recordId) => props.onRemoveff(recordId)}
      >
        <div
          className="p-2 rounded-md text-orange-500 text-sm font-medium hover:bg-orange-50"
          style={{}}
        >
          Following : {following.length}
        </div>
      </FFModal>
    </div>
  );
};

export default FFLabel;
