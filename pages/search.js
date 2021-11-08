import { format } from "date-fns";
import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({searchResults}) {
    const router = useRouter()
    const {location, startDate, endDate, noOfGuests} = router.query

    const formattedStartDate = format(new Date(startDate), "MMMM dd yy")
    const formattedEndDate = format(new Date(startDate), "MMMM dd yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`


    return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <main className="flex">
        <section className="flex-grow mt-14 mx-6">
          <p className="text-xs">300+ stays {range} for {noOfGuests} number of guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
        <div className="flex flex-col">
          {searchResults?.map(({img,location,title, description, star, price, total}) => (
              <InfoCard key={img} img={img} location={location} title={title} price={price} description={description} star={star} total={total} />
          ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl: min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}


export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch("https://jsonkeeper.com/b/5NPS").then(res => res.json())

    return {
        props: {
            searchResults
        }
    }
}