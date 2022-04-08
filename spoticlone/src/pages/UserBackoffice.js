import React, { useEffect, useState } from "react";
import SidebarBackoffice from "../components/common/SidebarBackoffice";
import { getUsers } from "../services/user.js";

const UserBackoffice = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [role, setRole] = useState(null);
  const [id, setId] = useState("");

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

  const setData = (user) => {
    //const {name, email, password, userRoleId } = user;
    setId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.userRoleId);
  }

  console.log(role);
  return (
    <div className="row bg-success">
      <SidebarBackoffice />
      <div className="col-4 grid-margin stretch-card mt-5">
        <div className="card bg-dark text-light">
          <div className="card-body mt-4">
            <h4 className="card-title text-center">Usuarios</h4>
            <p className="card-description text-center">Lista de usuarios</p>
            <div className="mt-4 mb-4">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="busca..."
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="table-responsive">
              <table className="table text-light">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToShow()?.map((user) => (
                    <tr key={user._id} onClick={() => setData(user)} >
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
      </div>
      <div className="col-4 grid-margin stretch-card mt-5">
        <div className="card bg-dark text-light">
          <div className="card-body mt-4">
            
            <div className="mt-4 mb-4">
              <input
                type="text"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="nombre"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="email"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="correo"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="contraseña"
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <input
                type="password"
                className="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="repite contraseña"
                onChange={(e) => setPassRepeat(e.target.value)}
                
              />
              <div class="form-check">
                <input
                  class="form-check-input mb-2"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onChange={(e) => setRole(e.target.value)}
                  value="user"
                  
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Usuario
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input mb-2"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="admin"
                  onChange={(e) => setRole(e.target.value)}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Administrador
                </label>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" style={{ minWidth: '4rem', width: '7rem'}}>Crear</button>
                <button className="btn btn-success" style={{ minWidth: '4rem', width: '7rem'}}>Actualizar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBackoffice;
