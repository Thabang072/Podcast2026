import { useParams } from "react-router-dom";

function ShowDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Podcast Details</h1>

      <h2>Podcast ID: {id}</h2>
    </div>
  );
}

export default ShowDetails;