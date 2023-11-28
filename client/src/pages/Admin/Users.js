/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout.js";
import AdminMenu from "./../../components/layout/AdminMenu";
import moment from "moment";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/all-users"
        );
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Layout title="Dashboard - All Users">
      <div class="p-3 mb-1 bg-dark text-white" style={{ height: "600px" }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center tt">User List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div class="d-flex ">
                  <div class="row gx-3">
                    <h4 class="border border-2 text-center">NAME</h4>
                    <ul class="list-unstyled text-center">
                      {users.map((user) => (
                        <>
                          <li key={user._id}>{user.name}</li>
                        </>
                      ))}
                    </ul>
                  </div>
                  {/* <div class="col-md-6"> */}
                  <div class="vertical-line text-white "></div>
                  {/* </div> */}
                  <div class="row gx-5">
                    <h4 class="border border-2 text-center">EMAIL</h4>
                    <ul class="list-unstyled text-center">
                      {users.map((user) => (
                        <>
                          <li key={user._id}>{user.email}</li>
                        </>
                      ))}
                    </ul>
                  </div>
                  <div class="row gx-5">
                    <h4 class="border border-2 text-center">CONTACT</h4>
                    <ul class="list-unstyled text-center">
                      {users.map((user) => (
                        <>
                          <li key={user._id}>{user.phone}</li>
                        </>
                      ))}
                    </ul>
                  </div>
                  <div class="row gx-5">
                    <h4 class="border border-2 text-center">ADDRESS</h4>
                    <ul class="list-unstyled text-center">
                      {users.map((user) => (
                        <>
                          <li key={user._id}>{user.address}</li>
                        </>
                      ))}
                    </ul>
                  </div>
                  <div class="row gx-3">
                    <h4 class="border border-2 text-center">ROLE</h4>
                    <ul class="list-unstyled text-center">
                      {users.map((user) => (
                        <>
                          <li key={user._id}>{user.role}</li>
                        </>
                      ))}
                    </ul>
                  </div>
                  <div className="row gx-2">
                    <h4 className="border border-2 text-center">
                      USER REGISTERED
                    </h4>
                    <ul className="list-unstyled text-center">
                      {users.map((user) => (
                        <li key={`${user._id}-last-login`}>
                          {moment(user.createdAt).fromNow()}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserList;
