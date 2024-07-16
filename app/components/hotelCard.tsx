type hotelCard = {
  name: string;
};

const HotelCard = ({ name }: hotelCard) => {
  return (
    <div className="w-72 h-24 bg-[#EBEFF3] rounded-md">
      <div className="h-full flex text-defaul-large shadow-lg font-semibold items-center justify-center">
        <div>{name}</div>
      </div>
    </div>
  );
};

export default HotelCard;
