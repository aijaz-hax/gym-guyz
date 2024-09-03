import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { medMapping, orthoMapping, famMap,lifestyleMap, goalMap } from "./Constant";

function App() {
  const params = useParams();
  // const [dataVal,setDataVal] = useState({})
  const [mind, setMind] = useState({})
  const [med, setMed] = useState([])
  const [lifestyle, setLifestyle] = useState([])
  const [goals,setGoals] = useState([])
  const [ortho, setOrtho] = useState([])
  const [bodyAssess, setBodyAssess] = useState({})
  const [familyHistory, setFamilyHistory] = useState([])
  const [other, setOther] = useState([])


  function mindVal(val) {
    let x = {}
    const mindOrder = ["FirstName", "LastName", "Gender", "Email", "BirthDate", "Country", "State", "City", "AddressLine1", "PostalCode", "MobilePhone", "EmergencyContactInfoName", "EmergencyContactInfoPhone", "EmergencyContactInfoRelationship", "ReferredBy", "SendPromotionalEmails", "SendAccountEmails", "SendScheduleEmails", "clientType"]
    mindOrder.forEach(key => {

      if (val[key]) {
        x[key] = val[key];
      }
    });
    setMind(x)
  }

  function commonVal(val) {
    // Convert the input object into an array of key-value pairs
    const data = Object.entries(val);

    // Filter the array to include only entries where the value is an array
    const updatedData = data
      .filter(([key, value]) => Array.isArray(value))
      .map(([key, value]) => ({ [key]: value }));
    console.log("Com", updatedData)
    return updatedData
  }
  function comVal(val, obj, type = false) {
    console.log("VL", val)
    // Convert the input object into an array of key-value pairs
    const data = Object.entries(val);

    // Filter the array to include only entries where the value is an array
    if (!type) {
      const updatedData = data
        .filter(([key, value]) => Array.isArray(value))
        .map(([key, value]) => ({ [key]: value }));
      console.log("Com", updatedData)
      const updatedData12 = updatedData.map(item => {
        const [oldKey, value] = Object.entries(item)[0]; // Get the old key and value
        const newKey = obj[oldKey] || oldKey; // Get the new key or default to the old key if not found in mapping
        return { [newKey]: value }; // Create new object with the updated key
      });
      console.log(updatedData12)
      return updatedData12
    }
    else {
      const updatedData = data.map(([key, value]) => ({ [key]: value }));
      const updatedData12 = updatedData.map(item => {
        const [oldKey, value] = Object.entries(item)[0]; // Get the old key and value
        const newKey = obj[oldKey] || oldKey; // Get the new key or default to the old key if not found in mapping
        return { [newKey]: value }; // Create new object with the updated key
      });
      console.log("UP", updatedData12)
      return updatedData12
    }

  }

  const removeEmptyStringValues = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === '') {
        delete obj[key];
      }
    });
    return obj;
  };

  const calAge = (dateVal) => {
    const birthDate = new Date(dateVal);

    // Get the current date
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust if the birth date hasn't occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age

  }


  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const url = `http://54.198.95.151:5000/client/${params.id}`;
        const response = await axios.get(url);
        const otherData = [
          { label: "Assessment Type", value: response?.data?.data?.assessmentType },
          { label: "Assessment Count", value: response?.data?.data?.assessmentCount },
          { label: "Finish Assessment Prompt One", value: response?.data?.data?.finishAssessmentPromptOne },
          { label: "Finish Assessment Prompt Two", value: response?.data?.data?.finishAssessmentPromptTwo },
          { label: "Finish Assessment Prompt Three", value: response?.data?.data?.finishAssessmentPromptThree },

        ]
        setOther(otherData)
        mindVal(response?.data?.data?.mindBodyData)
        const medHis = comVal(response?.data?.data?.parq?.medicalHistory, medMapping)
        setMed(medHis)
        const lifeSt = comVal(response?.data?.data?.parq?.lifestyle,lifestyleMap,true)
        console.log("Lf",lifeSt)
        setLifestyle(lifeSt)
        const goalSt = comVal(response?.data?.data?.parq?.goals,goalMap,true)
        setGoals(goalSt)
        const orth = comVal(response?.data?.data?.parq?.ortho, orthoMapping)
        setOrtho(orth)
        const bodyAs = removeEmptyStringValues(response?.data?.data?.bodyAssessment)
        setBodyAssess(bodyAs)
        const famSt = comVal(response?.data?.data?.parq?.familyHistory, famMap, true)
        setFamilyHistory(famSt)
        // setDataVal(response?.data?.data)
      } catch (err) {
      } finally {
      }
    };

    // Call the function
    fetchData();
  }, []);

  const data = [
    { name: "Heart", value: "Byepass,Surgery,Heart Attack" },
    { name: "Pacemaker", value: "Pacemaker,Implantable" },
    { name: "BP", value: "Beta Blocker,Angioplasty" },
    { name: "Heart", value: "Byepass,Surgery,Heart Attack" },
    { name: "Chest Pain", value: "Angina,Reflux" },
    { name: "Dizziness", value: "Dizziness,Fainting" },
  ]
  // const lifestyle = [
  //   { name: "Assessor Question", value: "Yes" },
  //   { name: "Are you or have you been a cigarette smoker?", value: "Formal" },
  //   { name: "Are you or have you been a e-cigarette?", value: "Medium" },
  //   { name: "Stress Level", value: "High" },
  //   { name: "Chest Pain", value: "Angina,Reflux" },
  //   { name: "Do you wake up feeling well rested?", value: "No" },
  // ]
  return (
    <div style={
      {
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        paddingBottom: "32px"
      }
    }>
      <div
        style={
          {
            background: `url(https://app-development-resourcifi.s3.amazonaws.com/Uploads/1724931802190/back.png)`,
            height: "456px"
          }
        }>
        <div style={
          {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 60px 0px 60px",
          }
        }>
          <div style=
            {{
              fontFamily: '"Oswald", sans-serif',
              fontWeight: "600",
              color: "white",
              fontSize: "16px"
            }}>
            Summary Report
          </div>
          <div>
            <div>
              <img src={`https://app-development-resourcifi.s3.amazonaws.com/Uploads/1724931740479/gym.png`} alt="gym-guyz" />
            </div>
            <div>
              <img src={`https://app-development-resourcifi.s3.amazonaws.com/Uploads/1724931740448/txt.png`} alt="gym-txt" />
            </div>
          </div>
        </div>
        <div style={
          {
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 60px 0px 60px",
          }
        }>
          <div style={
            {
              marginTop: "96px"
            }
          }>
            <div style=
              {{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: "700",
                color: "white",
                fontSize: "24px"
              }}>
              A Comprehensive
            </div>
            <div style=
              {{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: "700",
                color: "white",
                fontSize: "24px"
              }}>
              Physical Assessment Report
            </div>
            <div style={
              {
                borderTop: "2.82px solid #E4002B",
                marginTop: "11.3px"
              }
            }>

            </div>
            <div style={
              {
                display: "flex",
                gap: "32px",
                marginTop: "11.3px"
              }
            }>
              <div>
                {/* <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "400",
                    color: "white",
                    fontSize: "16px"
                  }
                }>
                  Assessment ID: #145668
                </div> */}
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "500",
                    color: "white",
                    fontSize: "22px"
                  }
                }>
                  {`${mind.FirstName} ${mind.LastName}`}
                </div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "400",
                    color: "white",
                    fontSize: "16px"
                  }
                }>
                  {`${mind.Gender} | ${calAge(mind.BirthDate)}`}
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div style={
            {
              marginTop: "104px",
              bottom: 0
            }
          }>
            <img src={'https://app-development-resourcifi.s3.amazonaws.com/Uploads/1724931802188/Rectangle%201.png'} alt="pic" style={{ width: "300px" }} />
          </div>
        </div>
      </div>
      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Mindbody Data Validation
        </div>
      </div>
      <div style={
        {
          margin: "0px 60px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          padding: "10px",
        }
      }>
        {Object.entries(mind).map(([key, value]) => (
          <div style={
            {
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }
          }>
            <div style={
              {
                fontFamily: '"Oswald", sans-serif',
                fontWeight: "400",
                color: "#000000",
                fontSize: "16px"
              }
            }>
              {key}
            </div>
            <div style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: "400",
              color: "#666666",
              fontSize: "16px"
            }}>
              {value.toString()}
            </div>
          </div>
        ))}
      </div>

      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Medical History
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 60px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {med.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, value], idx) => {
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                value.length > 0 &&
                <div key={idx} style={
                  {
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e3e3e3",
                    padding: "16px 0px"
                  }
                }>
                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#000000",
                      fontSize: "14px"
                    }
                  }>
                    {formattedKey}
                  </div>

                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#666666",
                      fontSize: "14px"
                    }
                  }>
                    {value.join(", ")}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Body Assessment
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 60px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {Object.entries(bodyAssess).map(([key, value]) => (

          <div >
            <div style={
              {
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #e3e3e3",
                padding: "16px 0px"
              }
            }>
              <div style={
                {
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: "400",
                  color: "#000000",
                  fontSize: "16px"
                }
              }>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>

              <div style={
                {
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: "400",
                  color: "#666666",
                  fontSize: "16px"
                }
              }>
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Lifestyle
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 60px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {lifestyle.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, value], idx) => {
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                value.length > 0 &&
                <div key={idx} style={
                  {
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e3e3e3",
                    padding: "16px 0px"
                  }
                }>
                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#000000",
                      fontSize: "16px"
                    }
                  }>
                    {formattedKey}
                  </div>

                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#666666",
                      fontSize: "16px"
                    }
                  }>
                    {Array.isArray(value) ? value.join(", ") : value.toString()}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Family History
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 60px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {familyHistory.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, value], idx) => {
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <div key={idx} style={
                  {
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e3e3e3",
                    padding: "16px 0px"
                  }
                }>
                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#000000",
                      fontSize: "14px"
                    }
                  }>
                    {formattedKey}
                  </div>

                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#666666",
                      fontSize: "14px"
                    }
                  }>
                    {value.toString()}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Ortho
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 60px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {ortho.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, value], idx) => {
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                value.length > 0 &&
                <div key={idx} style={
                  {
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e3e3e3",
                    padding: "16px 0px"
                  }
                }>

                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#000000",
                      fontSize: "16px"
                    }
                  }>
                    {formattedKey}
                  </div>

                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#666666",
                      fontSize: "16px"
                    }
                  }>
                    {value.join(", ")}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Goals
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 60px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {goals.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, value], idx) => {
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                value.length > 0 &&
                <div key={idx} style={
                  {
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e3e3e3",
                    padding: "16px 0px"
                  }
                }>
                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#000000",
                      fontSize: "16px"
                    }
                  }>
                    {formattedKey}
                  </div>

                  <div style={
                    {
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: "400",
                      color: "#666666",
                      fontSize: "16px"
                    }
                  }>
                    {Array.isArray(value) ? value.join(", ") : value.toString()}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={
        {
          margin: "0px 60px"
        }
      }>
        <div style={
          {
            // height:"43px",
            backgroundColor: "#F4F5EF",
            padding: "8px 16px",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: "500",
            color: "#000000",
            fontSize: "18px"

          }
        }>
          Other
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 60px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {other.map((item, index) => (
          <div key={index}>
            <div style={
              {
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #e3e3e3",
                padding: "16px 0px"
              }
            }>

              <div style={
                {
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: "400",
                  color: "#000000",
                  fontSize: "16px"
                }
              }>
                {item.label}
              </div>

              <div style={
                {
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: "400",
                  color: "#666666",
                  fontSize: "16px"
                }
              }>
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
