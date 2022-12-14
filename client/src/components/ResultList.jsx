import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "../App";
import Antonym from "./Antonym";
import Example from "./Example";
import MeanigList from "./MeaningList";
import Spinner from "./Spinner";
import Synonym from "./Synonym";

axios.defaults.baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const ResultList = () => {
  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (para) => {
    try {
      setLoading(true);
      const res = await axios(`/${para}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(inputValue.length) {
      fetchData(inputValue)
    }
  }, [inputValue]);

  if(loading) {
    return <Spinner />
  }

  if(error) {
    return <h3 className="text-center mt-10 font-semibold text-red-500">Sorry !! The word doesn't exsist </h3>
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
     {response && (
        <div>
          <h3 className="text-2xl font-bold mt-4">Meaning & Definitions:</h3>
          <MeanigList mean={response} />
          <h3 className="text-2xl font-bold mt-4">Example:</h3>
          <Example mean={response} />
          <h3 className="text-2xl font-bold mt-4">Synonym:</h3>
          <Synonym mean={response} />
          <h3 className="text-2xl font-bold mt-4">Antonym:</h3>
          <Antonym mean={response} />
        </div>
     )}
    </div>
  );
};

export default ResultList;
