const LeaderboardItem = (props) => {
  const {users} = props;
  return (
    <div>
       <h2>{users[0].username}</h2>
    </div>
   
  )
};

export default LeaderboardItem;

