import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import { getUsers } from "../services/user.js";

const UserBackoffice = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getUsers(token)
      .then((user) => {
        console.log(user);
        setUsers(user?.users);
      })
      .catch((err) => console.warn(err));
  }, []);

  useEffect(() => {
    const filtered = users?.filter((user) => {
      if (user.name.includes(text) || user.email.includes(text)) {
        return true;
      }
      return false;
    });
    setFilteredUsers(filtered);
  }, [text]);

  const itemsToShow = () => {
    if (text?.length) {
      return filteredUsers;
    }
    return users;
  };

  return (
    <div className="row bg-success">
      <SidebarBackoffice />
      <div className="col-8 mt-5">
        <div>
          <input
            type="email"
            className="form-control mb-4"
            id="exampleFormControlInput1"
            placeholder="busca..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <table className="table bg-dark text-light text-center container-fluid">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
                {/* <th scope="col">Opciones</th> */}
              </tr>
            </thead>
            <tbody>
              {/* todo roles or filtered roles */}
              {itemsToShow()?.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.userRoleId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserBackoffice;
