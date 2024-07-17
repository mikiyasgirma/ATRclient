import { FaHotel } from "react-icons/fa";

type hotelCard = {
  name: string;
};

const HotelCard = ({ name }: hotelCard) => {
  return (
    <div className="w-52 h-28 bg-white rounded-md">
      <div className="h-full flex text-defaul-large shadow-lg font-semibold items-center justify-center">
        <div className="flex space-x-2 items-center">
          <FaHotel size={20} />
          <div className="text-base">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
