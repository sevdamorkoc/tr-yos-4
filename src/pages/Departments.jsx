// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import ImageSection from "../components/departmentComponents/ImageSection";
import Selections from "../components/departmentComponents/Selections";
import Hamburger from "hamburger-react";
import { useState } from "react";
import useInfoCalls from "../hooks/useInfoCalls";
import { useSelector } from "react-redux";
import OneCard from "../components/card/OneCard";
import { t } from "i18next";
import useCardCalls from "../hooks/useCardCalls";
import { useNavigate } from "react-router-dom";
function Departments() {
  const { getAllDepartments, getUserInfo } = useInfoCalls();
  const { allDepartments, univercities } = useSelector((state) => state?.info);
  const { currentUser } = useSelector((state) => state?.auth);
  const { searchParameters } = useSelector((state) => state?.card);
  // eslint-disable-next-line no-unused-vars
  const [department, setDepartment] = useState([]);
  // const { searchParameters } = useSelector((state) => state?.card);
  const [isOpen, setOpen] = useState(false);

  console.log(" allDeps  ", allDepartments);
  console.log(" unis  ", univercities);

  const currentUserId = currentUser?.userID;
  const {
    moveToSelectedDepartments,
    removeFromSelectedDepartments,
    removeFromFavourites,
    moveToFavourites,
    getCompareList,
    getFavouriteList,
  } = useCardCalls();

  // const [selectedDepartments, setSelectedDepartments] = useState(["Software Engineering (MTOK) (EE)"]);
  // const [selectedCities, setSelectedCities] = useState("Adiyaman");
  // const [selectedUnivercities, setSelectedUnivercities] = useState(["ABDULLAH GUL UNIVERSITY"]);
  // const [departmentStatus, setDepartmentStatus] = useState(false);
  // const [univercitiesStatus, setUnivercitiesStatus] = useState(false);
  // const [cityStatus, setCityStatus] = useState(false);
  // const navigate = useNavigate();
  // setDepartment(allDepartments.slice(0, 21))
  useEffect(() => {
    currentUser && getUserInfo(currentUser?.userID);
  }, [currentUser]);

  useEffect(() => {
    getCompareList(currentUserId);
    getFavouriteList();
    getAllDepartments();
  }, []);

  console.log(department)
  useEffect(() => {

    if (searchParameters?.selectedDepartments) {


      return setDepartment(searchParameters?.selectedDepartments);

    } else {

      return setDepartment(allDepartments?.slice(71, 89));
    }
  }, [searchParameters]);

  //     console.log(" filtered ", filteredDepartments);
  //     setDepartment(filteredDepartments);
  //   } else {
  //     setDepartment(allDepartments?.slice(71, 89));
  //   }
  // }, [searchParameters]);
  //  const handleSearchClick = () => {
  //   if (selectedDepartments.length > 0) {
  //     setDepartment(selectedDepartments)
  //   } else {
  //     setDepartment(allDepartments)
  //   }
  //  }


  return (
    <>
      <div className="flex flex-col">
        <ImageSection />
        <div className="xs:flex-col xs:justify-center xs:items-center md:flex md:flex-row md:justify-center md:items-start">
          <div className="xs:visible xs:flex xs:justify-center xs:items-center sm:visible md:hidden">
            <button>
              <Hamburger
                label="show menu"
                toggled={isOpen}
                toggle={setOpen}
                direction="right"
              />
              {isOpen && (
                <div className="md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
                  <> 
                    <Selections />
                  
                    {/* <div className="flex flex-row  justify-end sm:justify-start md:justify-end bg-green-dark rounded ">
                          <button
                            name="searchDepartments"
                            type="submit"
                            className="max-sm:w-full max-sm:my-5 lg:text-sm md:sm:text-sm max-sm:text-xs bg-red-warm text-white-cream sm:p-2  max-sm:p-3 md:w-48 sm:w-96 font-bold rounded  hover:bg-red-retro shadow-md  lg:p-8 md:p-4 "
                          >
                            {t("Search")}
                          </button>
                        </div> */}
                  </>

                </div>
              )}
            </button>
          </div>
          <div className="xs:hidden sm:hidden md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">

            <div className="mt-36">
              <Selections />
            </div>
          </div>
          <div className="xs:flex xs:flex-col xs:justify-center xs:items-center sm:flex sm:flex-col sm:justify-center sm:items-center md:px-0">
            <div className="row mt-16 justify-center-center">
              <div className="sec-heading center">
                <h2 className="font-extrabold text-2xl">
                  {t("Our Departments")}
                </h2>
                <p>
                  {t("Our Departments")} {t("Our Departments")}{" "}
                  {t("Our Departments")}...
                </p>
              </div>
            </div>
            <div className="xs:m-0 xs:px-0 sm:m-0 sm:px-0 sm:w-full grid grid-cols-1 md:grid-cols-2 md:px-4 lg:grid-cols-3">

              {department?.map((item) => {
                return (
                  <OneCard
                    key={item.id}
                    item={item}
                    moveToSelectedDepartments={moveToSelectedDepartments}
                    removeFromSelectedDepartments={
                      removeFromSelectedDepartments
                    }
                    moveToFavourites={moveToFavourites}
                    removeFromFavourites={removeFromFavourites}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Departments;
