import { GeneralInfo } from './generalInfo'
import { Education } from './education';
import { WorkExperience} from './workExperience';
import { useState } from "react";
import { Iterate } from './helper';

const GENERAL_INFO_FIELDS = 4;
const EDUCATION_FIELDS = 3;
const WORK_EXPERIENCE_FIELDS = 5;

function checkIfFilled(generalInfoValues, educationValues, workExperienceValues){
  return (
    generalInfoValues.every(v => v !== "") &&
    educationValues.every(v => v !== "") &&
    workExperienceValues.every(v => v !== "")
  );
}

function createCVHandler(generalInfoValues, educationValues, workExperienceValues, build, setPage){
  if(!checkIfFilled(generalInfoValues, educationValues, workExperienceValues)){
    alert("You need to fill all the fields to proceed!");
    return false;
  }

  setPage(build+1);
}

function Submit(props){
  return <button onClick={props.handleClick}>Submit</button>
}

export function App(){
  const [generalInfoValues, setInfoValues] = useState(new Array(GENERAL_INFO_FIELDS).fill(0));
  const generalInfoNames = ["First Name", "Last Name", "Email", "Phone Number"];
  const [educationValues, setEduValues] = useState(new Array(EDUCATION_FIELDS).fill(0));
  const educationNames = ["School name", "Title of study", "Date of study"];
  const [workExperienceValues, setWorkValues] = useState(new Array(WORK_EXPERIENCE_FIELDS).fill(0));
  const workExperienceNames = ["Company name", "Position title", "Main responsabilities", "Start date", "End date"];
  const [buildCurriculum, setPage] = useState(0);

  if(buildCurriculum === 0){
    return(
      <>
        <h1>Build your curriculum!</h1>
        <GeneralInfo storage = {generalInfoValues} storageNames = {generalInfoNames}/>
        <Education storage = {educationValues} storageNames = {educationNames} update = {setEduValues} startLength = {EDUCATION_FIELDS}/>
        <WorkExperience storage = {workExperienceValues} storageNames = {workExperienceNames} update = {setWorkValues} startLength = {WORK_EXPERIENCE_FIELDS}/>
        <Submit handleClick = {() => createCVHandler(generalInfoValues, educationValues, workExperienceValues, buildCurriculum, setPage)}/>
      </>
    );
  } else {
    return(
      <>
        <div className = "general-info-curriculum">
          <h1>General information:</h1>
          <h2>{generalInfoValues[0] + " " + generalInfoValues[1]}</h2>
          <h3>Email: {generalInfoValues[2]}</h3>
          <h3>Phone number: {generalInfoValues[3]}</h3>
        </div>
        <div className = "education-curriculum">
          <h1>Education:</h1>
          <div className = "elements">
            <Iterate elements = {educationValues} names = {educationNames} numOfFields = {EDUCATION_FIELDS}/>
          </div>
        </div>
        <div className = "work-experience-curriculum">
          <h1>Work experience:</h1>
          <div className = "elements">
            <Iterate elements = {workExperienceValues} names = {workExperienceNames} numOfFields = {WORK_EXPERIENCE_FIELDS}/>
          </div>
        </div>
      </>
    );
  }
}