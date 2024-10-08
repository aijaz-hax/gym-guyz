import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { medMapping, orthoMapping, famMap, lifestyleMap, goalMap, prgMap, tstMap, mindMap, bodyMap, adaptMap, STRINGS } from "./Constant";
import { calAge, comVal, removeEmptyStringValues, replaceKeys } from "./Helper";

function App() {
  const params = useParams();
  // const [dataVal,setDataVal] = useState({})
  const [mind, setMind] = useState({})
  const [med, setMed] = useState([])
  const [lifestyle, setLifestyle] = useState([])
  const [goals, setGoals] = useState([])
  const [ortho, setOrtho] = useState([])
  const [bodyAssess, setBodyAssess] = useState({})
  const [familyHistory, setFamilyHistory] = useState([])
  const [other, setOther] = useState([])
  const [program, setProgram] = useState([])
  const [posture,setPosture] = useState([])
  const [adaptive,setAdaptive] = useState([])
  const [test,setTest] = useState([])

  const colorList = {
    under: "#416CFF",
    normal: "#84EF36",
    over: "#FFB648",
    very: "#FF1A1A"
  }


  function mindVal(val) {
    let x = {}
    const mindOrder = ["FirstName", "LastName", "Gender", "Email", "BirthDate", "Country", "State", "City", "AddressLine1", "PostalCode", "MobilePhone", "EmergencyContactInfoName", "EmergencyContactInfoPhone", "EmergencyContactInfoRelationship", "ReferredBy", "SendPromotionalEmails", "SendAccountEmails", "SendScheduleEmails", "clientType"]
    mindOrder.forEach(key => {

      if (val[key]) {
        x[key] = val[key];
      }
    });
    const final = replaceKeys(x,mindMap)
    setMind(final)
  }

  function selVal(type = false) {
    if (!type) {
      switch (true) {
        case (parseFloat(bodyAssess?.["Body Mass Index"]) < 18.5):
          return {
            id: "#416CFF",
            value: "#a4a4f5",
            data: "underweight"
          }
        case (parseFloat(bodyAssess?.["Body Mass Index"]) >= 18.5 && parseFloat(bodyAssess?.["Body Mass Index"]) <= 24.9):
          return {
            id: "#84EF36",
            value: "#95edad",
            data: "normal"
          }
        case (parseFloat(bodyAssess?.["Body Mass Index"]) >= 25 && parseFloat(bodyAssess?.["Body Mass Index"]) <= 29.9):
          return {
            id: "#FFB648",
            value: "#FFF5E5",
            data: "overweight"
          }
        case (parseFloat(bodyAssess?.["Body Mass Index"]) > 30):
          return {
            id: "#FF1A1A",
            value: "#ed343d",
            data: "obese"
          }
        default:
          return {
            id: "#000000",
            value: "blue",
            data: "obese"
          }
      }
    }
    else {
      switch (true) {
        case (parseFloat(bodyAssess?.["Visceral Fat"]) >= 1 && parseFloat(bodyAssess?.["Visceral Fat"]) <= 9):
          return {
            id: "#05fc47",
            value: "#e1fae8",
            data: "normal"
          }
        case (parseFloat(bodyAssess?.["Visceral Fat"]) >= 10 && parseFloat(bodyAssess?.["Visceral Fat"]) <= 14):
          return {
            id: "#FFB648",
            value: "#FFF5E5",
            data: "high"

          }
        case (parseFloat(bodyAssess?.["Visceral Fat"]) > 15):
          return {
            id: "#FF1A1A",
            value: "#fcb3b7",
            data: "very high"
          }
        default:
          return {
            id: "#000000",
            value: "blue",
            data: "normal"
          }
      }
    }
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
          { label: "Describe the area(s) where your workouts will take place. Include any equipment available. Are there pets?", value: response?.data?.data?.finishAssessmentPromptOne },
          { label: "Summarize the Client for the Trainer - personality, how they tolerated the fitness assessment, goals, things to look out for, etc.", value: response?.data?.data?.finishAssessmentPromptTwo },
          { label: "Are there any upsell opportunities that were apparent or discussed? Semi-Private? Stretch? Nutrition? Larger Package?", value: response?.data?.data?.finishAssessmentPromptThree },

        ]
        setOther(otherData)
        mindVal(response?.data?.data?.mindBodyData)
        const medHis = comVal(response?.data?.data?.parq?.medicalHistory, medMapping)
        setMed(medHis)
        const lifeSt = comVal(response?.data?.data?.parq?.lifestyle, lifestyleMap, true)
        setLifestyle(lifeSt)
        const goalSt = comVal(response?.data?.data?.parq?.goals, goalMap, true)
        setGoals(goalSt)
        const orth = comVal(response?.data?.data?.parq?.ortho, orthoMapping)
        setOrtho(orth)
        const bodyAs = removeEmptyStringValues(response?.data?.data?.bodyAssessment)
        const final = replaceKeys(bodyAs,bodyMap)
        // console.log(bodyAs,"BODY")
        setBodyAssess(final)
        const famSt = comVal(response?.data?.data?.parq?.familyHistory, famMap, true)
        setFamilyHistory(famSt)
        const prgSt = comVal(response?.data?.data?.fitnessAssessment?.program, prgMap, true)
        setProgram(prgSt)
        const testSt = comVal(response?.data?.data?.fitnessAssessment?.test, tstMap, true)
        setTest(testSt)
        setPosture([
           {label:"Posture",value:response?.data?.data?.fitnessAssessment?.posture},
           {label:"Resting Heart Rate" , value:response?.data?.data?.fitnessAssessment?.restingHeartRate}
          ]
        )
        const adaptSt = comVal({...response?.data?.data?.adaptiveReport?.formOne,...response?.data?.data?.adaptiveReport?.formTwo}, adaptMap, true)
        setAdaptive(adaptSt)
      } catch (err) {
      } finally {
      }
    };

    // Call the function
    fetchData();
  }, []);

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
            padding: "18px 30px 0px 30px",
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
            padding: "0px 30px 0px 30px",
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
              {STRINGS.COMPREHENSIVE}
            </div>
            <div style=
              {{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: "700",
                color: "white",
                fontSize: "24px"
              }}>
              {STRINGS.PHYSICAL}
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
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "500",
                    color: "white",
                    fontSize: "22px"
                  }
                }>
                  {`${mind["First Name"]} ${mind["Last Name"]}`}
                </div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "400",
                    color: "white",
                    fontSize: "16px"
                  }
                }>
                  {`${mind.Gender} | ${calAge(mind["Date Of Birth"])}`}
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
          margin: "0px 30px"
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
          {STRINGS.MINDBODY}
        </div>
      </div>
      <div style={
        {
          margin: "0px 30px",
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
              {value.toString() == "true" ? "Yes" : (value.toString() == "false" ? "No" :value.toString())}
            </div>
          </div>
        ))}
      </div>

      <div style={
        {
          margin: "0px 30px"
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
          {STRINGS.MEDICAL}
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
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
          margin: "0px 30px"
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
          {STRINGS.BODY}
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
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
          margin: "0px 30px"
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
          {STRINGS.LIFESTYLE}
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
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
                    {Array.isArray(value) ? value.join(", ") :( value.toString() === "true" ? "Yes" : value.toString() === "false" ? "No" : value.toString())}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={
        {
          margin: "0px 30px"
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
          {STRINGS.FAMILY}
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
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
                    {Array.isArray(value) ? value.join(", ") :( value.toString() === "true" ? "Yes" : value.toString() === "false" ? "No" : value.toString())}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div style={
        {
          margin: "0px 30px"
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
          {STRINGS.ORTHO}
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
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

      <div style={{
        margin: "0px 30px",
        // width:"100%",
        display: "flex",
        gap: "16px",
        justifyContent: "space-between"
      }}>

        {bodyAssess?.["Body Mass Index"] ?
          <div style={
            {
              border: "1px solid #e3e3e3",
              width: "48%",
              height: "250px",
              borderRadius: "8px",
              padding: "16px"
            }
          }>
            <div style={
              {
                paddingBottom: "8px",
                borderBottom: "1px solid #e3e3e3",
                display: "flex",
                alignItems: "center"
              }

            }>
              <span style={{ color: "#000000", fontWeight: "600", fontFamily: 'Roboto, sans-serif', fontSize: "16px" }}>{STRINGS.BODY_MASS}</span>
              <span style={{ color: "#666666", fontWeight: "600", fontFamily: 'Roboto, sans-serif', fontSize: "11px", paddingTop: "2px" }}>(Kg/m2)</span>
            </div>
            <div style={{
              marginTop: "30px",
              display: "flex",
              borderRadius: "12px",
            }}>
              <div style={
                {
                  background: "linear-gradient(180deg, #416CFF 35.2%, #274199 50%)",
                  width: "25%",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              }>
                <div style={
                  {
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "10px"
                  }
                }>
                  <div style={{ textAlign: "center" }}>{`< 18.5`}</div>
                  <div style={{ textAlign: "center" }}>{`Underweight`}</div>
                </div>
              </div>
              <div style={{
                background: "linear-gradient(184.58deg, #84EF36 3.71%, #4FBA13 41.27%)", width: "25%",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={
                  {
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "10px"
                  }
                }>
                  <div style={{ textAlign: "center" }}>{`18.5 - 24.9`}</div>
                  <div style={{ textAlign: "center" }}>{`Normal`}</div>
                </div>
              </div>
              <div style={{
                background: "linear-gradient(100.67deg, #FFA31A 0.82%, #FFB240 148.72%)", width: "25%",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={
                  {
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "10px"
                  }
                }>
                  <div style={{ textAlign: "center" }}>{`25 - 29.9`}</div>
                  <div style={{ textAlign: "center" }}>{`Overweight`}</div>
                </div>
              </div>
              <div style={{
                background: "linear-gradient(150.14deg, #FF1A1A -12.19%, #C92020 47.92%)", width: "25%",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={
                  {
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "10px"
                  }
                }>
                  <div style={{ textAlign: "center" }}>{`> 30`}</div>
                  <div style={{ textAlign: "center" }}>{`Obese`}</div>

                </div>
              </div>
            </div>
            <div
              style={
                {
                  alignItems: "center",
                  marginTop: "40px"
                }
              }
            >
              <div style={{ color: "#000000", fontWeight: "600", fontFamily: 'Roboto, sans-serif', fontSize: "16px", textAlign: "center" }}>{`Your BMI is ...`}</div>
              <div style={{ color: `${selVal().id}`, fontWeight: "600", fontFamily: '"Oswald", sans-serif', fontSize: "32px", textAlign: "center" }}>{bodyAssess?.["Body Mass Index"] || 0}</div>
              <div style={{
                color: `${selVal().id}`, fontWeight: "600", fontFamily: '"Oswald", sans-serif', fontSize: "14px",
                textAlign: "center",
                backgroundColor: `${selVal().value}`,
                padding: "0 8px 4px 0",
                width: "99px",
                margin: "auto",
                borderRadius: "100px"

              }}>{`${selVal().data}`}</div>
            </div>
          </div> : <div></div>
        }
        {bodyAssess?.["Visceral Fat"] ?
          <div style={
            {
              border: "1px solid #e3e3e3",
              width: "48%",
              height: "250px",
              borderRadius: "8px",
              padding: "16px"
            }
          }>
            <div style={
              {
                paddingBottom: "8px",
                borderBottom: "1px solid #e3e3e3",
                display: "flex",
                alignItems: "center"
              }

            }>
              <span style={{ color: "#000000", fontWeight: "600", fontFamily: 'Roboto, sans-serif', fontSize: "16px" }}>{STRINGS.VISCERAL}</span>
            </div>
            <div style={{
              marginTop: "30px",
              display: "flex",
              borderRadius: "12px",
            }}>
              <div style={{
                background: "linear-gradient(184.58deg, #84EF36 3.71%, #4FBA13 41.27%)", width: "33.3%",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={
                  {
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "10px"
                  }
                }>
                  <div style={{ textAlign: "center" }}>{`1 - 9`}</div>
                  <div style={{ textAlign: "center" }}>{`Normal`}</div>

                </div>
              </div>
              <div style={{
                background: "linear-gradient(100.67deg, #FFA31A 0.82%, #FFB240 148.72%)", width: "33.3%",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={
                  {
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "10px"
                  }
                }>
                  <div style={{ textAlign: "center" }}>{`10 - 14`}</div>
                  <div style={{ textAlign: "center" }}>{`High`}</div>

                </div>
              </div>
              <div style={{
                background: "linear-gradient(150.14deg, #FF1A1A -12.19%, #C92020 47.92%)", width: "33.3%",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={
                  {
                    color: "#FFFFFF",
                    fontWeight: "700",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "10px"
                  }
                }>
                  <div style={{ textAlign: "center" }}>{`> 15`}</div>
                  <div style={{ textAlign: "center" }}>{`Very High`}</div>

                </div>
              </div>
            </div>
            <div
              style={
                {
                  // display:"flex",
                  // justifyContent:"space-between",
                  alignItems: "center",
                  marginTop: "40px"
                }
              }
            >
              <div style={{ color: "#000000", fontWeight: "600", fontFamily: 'Roboto, sans-serif', fontSize: "16px", textAlign: "center" }}>{`Your Visceral Fat is ...`}</div>
              <div style={{ color: `${selVal(true).id}`, fontWeight: "600", fontFamily: '"Oswald", sans-serif', fontSize: "32px", textAlign: "center" }}>{bodyAssess?.["Visceral Fat"] || 0}</div>
              <div style={{
                color: `${selVal(true).id}`, fontWeight: "600", fontFamily: '"Oswald", sans-serif', fontSize: "14px",
                textAlign: "center",
                backgroundColor: `${selVal(true).value}`,
                padding: "0 8px 4px 0",
                width: "99px",
                margin: "auto",
                borderRadius: "100px",

              }}>{`${selVal(true).data}`}</div>
            </div>
          </div> : <div></div>
        }



      </div>

      <div style={
        {
          margin: "0px 30px"
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
          {STRINGS.GOALS}
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
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
          margin: "0px 30px"
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
          Fitness Assessment {`Program`} 
        </div>
      </div>


      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {program?.map((item,id) => {
          const key = Object.keys(item)[0]; // Get the key (e.g., "sq", "sq1")
          const value = item[key]; // Get the value object
          {/* const subKey = Object.keys(value)[0];  */}
          return (
            (value["score"] || value["observation"]?.length > 0) &&
            <div key={id} style={{ marginTop: "12px" }}>
              <div style={
                {
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e3e3e3",
                  display: "flex",
                  alignItems: "center"
                }

              }>
                <span style={{ color: "#000000", fontWeight: "600", fontFamily: 'Roboto, sans-serif', fontSize: "14px" }}>{key}</span>
              </div>
              <div style={{
                marginTop: "12px",
                display: "flex",
                justifyContent:"flex-start"
              }}>
                <div style={
                  {
                    width: "50%",
                  }
                }>
                  <div style={{
                    background: "#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    Score
                  </div>
                  <div style={{
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    {value["score"] || "--"}
                  </div>
                </div>
                <div style={
                  {
                    width: "50%"
                  }
                }>
                  <div style={{
                    background: "#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    Observation
                  </div>
                  <div style={{
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    {value["observation"]?.join(", ") || "--"}
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </div>

      <div style={
        {
          margin: "0px 30px"
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
          Fitness Assessment {`Posture/Heart Rate`} 
        </div>
      </div>
 
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {posture.map((item, index) => (
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
                {item?.label}
              </div>

              <div style={
                {
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: "400",
                  color: "#666666",
                  fontSize: "16px"
                }
              }>
                {Array.isArray(item?.value) ? item?.value?.join(", ") : item?.value}
              </div>
            </div>
          </div>
        ))}
      </div>


      <div style={
        {
          margin: "0px 30px"
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
          Fitness Assessment {`Test`} 
        </div>
      </div>

      
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {test?.map((item,id) => {
          const key = Object.keys(item)[0]; // Get the key (e.g., "sq", "sq1")
          const value = item[key]; // Get the value object
          {/* const subKey = Object.keys(value)[0];  */}
          return (
            (value["timing"] || value["observation"]?.length > 0 || value["reps"]) &&
            <div key={id} style={{ marginTop: "12px" }}>
              <div style={
                {
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e3e3e3",
                  display: "flex",
                  alignItems: "center"
                }

              }>
                <span style={{ color: "#000000", fontWeight: "600", fontFamily: 'Roboto, sans-serif', fontSize: "14px" }}>{key}</span>
              </div>
              <div style={{
                marginTop: "12px",
                display: "flex",
              }}>
                <div style={
                  {
                    width: "33.3%",
                  }
                }>
                  <div style={{
                    background: "#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    Time
                  </div>
                  <div style={{
                    // background:"#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    {value["timing"] || "--"}
                  </div>
                </div>
                <div style={
                  {
                    width: "33.3%"
                  }
                }>
                  <div style={{
                    background: "#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    Reps
                  </div>
                  <div style={{
                    // background:"#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    {value["reps"] || "--"}
                  </div>
                </div>
                <div style={
                  {
                    width: "33.3%"
                  }
                }>
                  <div style={{
                    background: "#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    Observation
                  </div>
                  <div style={{
                    // background:"#F4F5EF",
                    border: "1px solid #e3e3e3",
                    textAlign: "center",
                    color: "#666666",
                    fontWeight: "500",
                    padding: "4px 12px 4px 12px",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "14px"

                  }}>
                    {value["observation"]?.join(", ") || "--"}
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </div>

      <div style={
        {
          margin: "0px 30px"
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
          Adaptive Report
        </div>
      </div>

      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
          border: "1px solid #e3e3e3",
          borderRadius: "4px"
        }
      }>
        {adaptive.map((item, index) => (
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
                    {Array.isArray(value) ? value.join(", ") :( value.toString() === "true" ? "Yes" : value.toString() === "false" ? "No" : value.toString())}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div style={
        {
          margin: "0px 30px"
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
          New Client Note
        </div>
      </div>
      <div style={
        {
          alignItems: "center",
          padding: "16px",
          margin: "0px 30px",
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
