import axios from "axios";
import { useEffect, useState } from "react"

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  const getAllTicketsByUsers = async () => {
    try {
      const { data } = await axios.get("/dashboard/statistic/total-revenue");
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllTicketsByUsers();
  }, []);
  return (
    <>
      <div className="movie-facility padding-bottom padding-top">
        <div className="container">
          <div className="row">
            <div className="section-header-3 col-12">
              <h2 className="title">Vé bạn đã mua</h2>
            </div>
            <div className="col-md-12 col-lg-8">

            </div>
            <div className="col-md-12 col-lg-2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketsPage