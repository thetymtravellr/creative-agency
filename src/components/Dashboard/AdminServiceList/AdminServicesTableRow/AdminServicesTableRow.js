import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./AdminServicesTableRow.css";

const AdminServicesTableRow = ({ service }) => {
  const [selectedStatus, setSelectedStatus] = useState(service.status);

  const handleDropdownChange = (e) => {
    const newSelected = e.target.value;
    setSelectedStatus(newSelected);

    const formData = new FormData();
    formData.append("id", service._id);
    formData.append("status", e.target.value);

    fetch("https://agency-jahed.herokuapp.com/updateOrderStatus", {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("order status updated successfully");
        }
      });
  };

  return (
    <tr>
      <td>{service.name}</td>
      <td>{service.email}</td>
      <td>{service.category}</td>
      <td>{service.details}</td>
      <td>
        <select
          className={`text-${selectedStatus}`}
          value={selectedStatus}
          onChange={handleDropdownChange}
        >
          <option className="text-Pending" value="Pending">
            Pending
          </option>
          <option className="text-Done" value="Done">
            Done
          </option>
          <option className="text-OnProcess" value="OnProcess">
            On Process
          </option>
        </select>
      </td>
    </tr>
  );
};

export default AdminServicesTableRow;
