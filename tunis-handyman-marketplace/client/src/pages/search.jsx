import { SEARCH_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchGridItem from "../components/search/SearchGridItem";
import { MagnifyingGlass } from "react-loader-spinner";

const search = () => {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const params = new URLSearchParams();
        if (q && q !== "undefined") params.append("searchTerm", q);
        if (category && category !== "undefined")
          params.append("category", category);

        const { data } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?${params.toString()}`,
        );
        setGigs(data.gigs);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    // Always fetch on mount or when params change (fetch all if no params)
    getData();
  }, [category, q]);

  if (loading)
    return (
      <div className="flex items-center justify-center text-5xl min-h-[76vh]">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );

  return (
    <div className="mx-24 mb-24">
      {q && (
        <h3 className="text-4xl mb-10">
          Results for <b>{q}</b>
        </h3>
      )}
      {category && (
        <h3 className="text-4xl mb-10">
          Results for <b>{category}</b>
        </h3>
      )}
      {!q && !category && (
        <h3 className="text-4xl mb-10">
          <b>All Services</b>
        </h3>
      )}
      <div className="flex gap-4">
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Category
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Budget
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Delivery Time
        </button>
      </div>
      <div>
        <div className="my-4">
          <span className="text-[#74767e] font-medium ">
            {gigs.length} services available
          </span>
        </div>
        {gigs.length > 0 ? (
          <div className="grid grid-cols-4">
            {gigs.map((gig) => (
              <SearchGridItem gig={gig} key={gig.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600">No services found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default search;
