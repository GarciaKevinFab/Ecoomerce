import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import axios from 'axios';

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get(`${BASE_URL}orders/income`);
        setIncome(res.data);

        if (res.data && res.data.length > 1) {
          setPerc((res.data[1].total * 100) / res.data[0].total - 100);
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Ganancia</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">S/.{income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">En comparación con el mes pasado.</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">S/.4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">En comparación con el mes pasado.</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Costo</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">S/.2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">En comparación con el mes pasado.</span>
      </div>
    </div>
  );
}
