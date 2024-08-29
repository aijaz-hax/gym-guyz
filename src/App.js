function App() {

  const data = [
    {name:"Heart",value:"Byepass,Surgery,Heart Attack"},
    {name:"Pacemaker",value:"Pacemaker,Implantable"},
    {name:"BP",value:"Beta Blocker,Angioplasty"},
    {name:"Heart",value:"Byepass,Surgery,Heart Attack"},
    {name:"Chest Pain",value:"Angina,Reflux"},
    {name:"Dizziness",value:"Dizziness,Fainting"},
  ]
  const lifestyle = [
    {name:"Assessor Question",value:"Yes"},
    {name:"Are you or have you been a cigarette smoker?",value:"Formal"},
    {name:"Are you or have you been a e-cigarette?",value:"Medium"},
    {name:"Stress Level",value:"High"},
    {name:"Chest Pain",value:"Angina,Reflux"},
    {name:"Do you wake up feeling well rested?",value:"No"},
  ]
  return (
    <div style={
      {
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        paddingBottom:"32px"
      }
    }>
      <div
        style={
          {
            background: `url(https://app-development-resourcifi.s3.amazonaws.com/Uploads/1724931802190/back.png)`,
            height: "456px",
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
              marginTop: "40px"
            }
          }>
            <div style=
              {{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: "700",
                color: "white",
                fontSize: "54px"
              }}>
              A Comprehensive
            </div>
            <div style=
              {{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: "700",
                color: "white",
                fontSize: "54px"
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
                gap: "48px",
                marginTop: "11.3px"
              }
            }>
              <div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "400",
                    color: "white",
                    fontSize: "16px"
                  }
                }>
                  Assessment ID: #145668
                </div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "500",
                    color: "white",
                    fontSize: "28px"
                  }
                }>
                  Brooklyn Simmons
                </div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "400",
                    color: "white",
                    fontSize: "16px"
                  }
                }>
                  Male | 29 years
                </div>
              </div>
              <div style={
                {
                  borderLeft: "1px solid white"
                }
              }>
                |
              </div>
              <div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "400",
                    color: "white",
                    fontSize: "16px"
                  }
                }>
                  Trainer ID: #145668
                </div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "500",
                    color: "white",
                    fontSize: "28px"
                  }
                }>
                  Jenny Wilson
                </div>
                <div style={
                  {
                    fontFamily: '"Oswald", sans-serif',
                    fontWeight: "400",
                    color: "white",
                    fontSize: "16px"
                  }
                }>
                  Male | 29 years
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div style={
            {
              marginTop: "3px"
            }
          }>
            <img src={'https://app-development-resourcifi.s3.amazonaws.com/Uploads/1724931802188/Rectangle%201.png'} alt="pic" />
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
            First Name
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Brookyln
          </div>
        </div>
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
            Last Name
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Simmons
          </div>
        </div>
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
            City
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Scottsdale
          </div>
        </div>
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
            Address Line
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            15205 North Kierland Blvd, Suite 100
          </div>
        </div>
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
            State
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Arizona
          </div>
        </div>
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
            Zip Code
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            85254
          </div>
        </div>
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
            Phone Number
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            +1-6154865695
          </div>
        </div>
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
            Email Address
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Brooklynsimmons@gmail.com
          </div>
        </div>
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
            Date of Birth
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            12-01-1998
          </div>
        </div>
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
            Gender
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Male
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
          Emergency Contact Details
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
            Emergency Contact Name
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Robert Fox
          </div>
        </div>
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
            Relationship
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            Brother         
          </div>
        </div>
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
            Emergency Contact Number
          </div>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }}>
            +1-54865695
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
          Medical History
        </div>
      </div>
      <div style={
        {
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"16px",
          margin: "0px 60px",
          border:"1px solid #e3e3e3",
          borderRadius:"4px"
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
          Your Body Age
        </div>
        <div style={
          {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }
        }>
          35 years
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
          Medical History
        </div>
      </div>
      <div style={
        {
          alignItems:"center",
          padding:"16px",
          margin: "0px 60px",
          border:"1px solid #e3e3e3",
          borderRadius:"4px"
        }
      }>
      {data?.map((itm,id)=>{
        return(
          <div key={id} style={
        {
          display:"flex",
          justifyContent:"space-between",
          borderBottom: "1px solid #e3e3e3",
          padding:"16px 0px"
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
          {itm.name}
        </div>
        <div style={
          {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }
        }>
          {itm.value}
        </div>
      </div>
        )
      })
      }
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
          alignItems:"center",
          padding:"16px",
          margin: "0px 60px",
          border:"1px solid #e3e3e3",
          borderRadius:"4px"
        }
      }>
      {lifestyle?.map((itm,id)=>{
        return(
          <div key={id} style={
        {
          display:"flex",
          justifyContent:"space-between",
          borderBottom: "1px solid #e3e3e3",
          padding:"16px 0px"
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
          {itm.name}
        </div>
        <div style={
          {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: "400",
            color: "#666666",
            fontSize: "16px"
          }
        }>
          {itm.value}
        </div>
      </div>
        )
      })
      }
      </div>
    </div>
  );
}

export default App;
