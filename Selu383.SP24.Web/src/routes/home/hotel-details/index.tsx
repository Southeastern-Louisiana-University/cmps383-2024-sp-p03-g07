import { useParams } from "react-router-dom";

export default function HotelDetails() {
  const { foo } = useParams();
  return <h2>The details for {foo}</h2>;
}