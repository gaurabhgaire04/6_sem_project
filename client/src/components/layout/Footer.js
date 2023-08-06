import React from "react";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <div>
      <div className="container1 ">
        {/* Grid container */}
        <div className="abus">
          {/* Grid row */}
          <div className="row ">
            {/* Grid column */}
            <div className="">
              <h5 className=" abb text-uppercase mb-4">About us</h5>
            </div>
          </div>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti.
          </p>
          <p>
            Blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias.
          </p>
        </div>

        <div className="feedback">
          <h5 className="aa text-uppercase mb-4">LEAVE A FEEDBACK</h5>
          <textarea className="box"></textarea>
          <button className="b">Submit</button>
        </div>

        <div className="cus ">
          <h5 className="text-uppercase mb-4">CONTACT US</h5>
          <ul className="" />

          <i className="fas fa-home"></i>
          <span className="ms-2">🏚️ Kathmandu, 3306, Nepal</span>

          <i className="fas fa-envelope"></i>
          <span className="ms-2">📧 info@example.com</span>

          <i className="fas fa-phone"></i>
          <span className="ms-2">☎️ +977 9867543214</span>
        </div>
      </div>
      <h4 className="cc">@2023 Copyright:Watch Nexus by Gaurav Gaire</h4>
    </div>
  );
};
