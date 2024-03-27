import { Link, useParams } from "react-router-dom";


export default function HotelDetails() {
  const { foo } = useParams();
  return (
    <div>
      <h2>The details for {foo}</h2>
      <Link to={"/"}>Home</Link>
    </div>
    
    
  );
}