import React, { useEffect, useState } from "react";
import {
  PageComponent,
  PaginationLinks,
  SurveyListItem,
  TButton,
  Loader,
} from "../components";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../axios";
import router from "../router";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Surveys() {
  const { showToast } = useStateContext();
  const [surveys, setsurveys] = useState([]);
  const [meta, setmeta] = useState({});
  const [loading, setloading] = useState(false);

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure to delete it?")) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys();
        showToast("The survey deleted successfully.");
      });
    }
  };

  const onPageClick = (link) => {
    getSurveys(link.url);
  };

  const getSurveys = (url) => {
    url = url || "survey";
    setloading(true);
    axiosClient.get(url).then(({ data }) => {
      setsurveys(data.data);
      setmeta(data.meta);
      setloading(false);
    });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <PageComponent
      title="Surveys"
      buttons={
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create New
        </TButton>
      }
    >
      {loading && (
        <div className="text-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <div>
          {surveys.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              You don't have survey created.
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyListItem
                survey={survey}
                key={survey.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          {surveys.length > 0 && (
            <PaginationLinks meta={meta} onPageClick={onPageClick} />
          )}
        </div>
      )}
    </PageComponent>
  );
}
