"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  fetchHotelOccupancyADR,
  fetchHotelOccupancyRate,
  fetchHotelRanking,
  fetchHotelRevpar,
} from "../queries";
import { useEffect, useState } from "react";
import { getTodayDate } from "@/app/utils/toDate";

type rankingRate = {
  revParRank: number;
  occupancyRateRank: number;
  adrRank: number;
  poolSize: number;
};

export default function Page({ params }: { params: { id: string } }) {
  const [occupancyRate, setOccupancyRate] = useState(null);
  const [adr, setAdr] = useState(null);
  const [revpar, setRevpar] = useState(null);
  const [ranking, setRanking] = useState<rankingRate>();

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [occupancyRateData, adrData, revparData, rankingData] =
          await Promise.all([
            fetchHotelOccupancyRate(session.data?.accessToken, params.id),
            fetchHotelOccupancyADR(session.data?.accessToken, params.id),
            fetchHotelRevpar(session.data?.accessToken, params.id),
            fetchHotelRanking(session.data?.accessToken, params.id),
          ]);
        setOccupancyRate(occupancyRateData);
        setAdr(adrData);
        setRevpar(revparData);
        setRanking(rankingData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [session.data?.accessToken, params.id]);

  return (
    <div>
      <div className="pb-6 underline underline-offset-4 text-lg text-primary font-semibold">
        Hotel Performance <span>({getTodayDate()})</span>
      </div>
      <div className="grid grid-cols-2 gap-12 items-center">
        <div className="w-full h-auto relative">
          <Image
            src="/hotel.jpg"
            alt="Image picture"
            layout="responsive"
            width={400}
            height={200}
          />
        </div>
        <div className="w-full h-auto relative">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-xs">Ocupancy Rate</div>
            <div className="text-xs">Ocupancy Rank</div>
            <div className="text-xl font-font-medium text-primary">
              {occupancyRate}
            </div>
            <div className="text-xl font-font-medium text-primary">
              {ranking?.occupancyRateRank} / {ranking?.poolSize}
            </div>
            <div className="text-xs">Revenue per available room (RevPar)</div>
            <div className="text-xs">Revenue per available Rank (RevPar)</div>
            <div className="text-xl font-font-medium text-primary">
              {revpar}
            </div>
            <div className="text-xl font-font-medium text-primary">
              {ranking?.revParRank} / {ranking?.poolSize}
            </div>
            <div className="text-xs">Average Daily Rate (ADR)</div>
            <div className="text-xs">Average Daily Rate Rank (ADR)</div>
            <div className="text-xl font-font-medium text-primary">{adr}</div>
            <div className="text-xl font-font-medium text-primary">
              {ranking?.adrRank} / {ranking?.poolSize}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
