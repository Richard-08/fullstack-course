import React from "react";

export default function CountriesList({ data, handleShow }) {
  return (
    <>
      {data.length > 10 ? (
        <h4>Too many matches, specify another filter</h4>
      ) : (
        <table>
          <tbody>
            {data.map((item) => (
              <tr key={item.name.common}>
                <td>{item.name.common}</td>
                <td>
                  <button onClick={() => handleShow(item)}>Show</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
