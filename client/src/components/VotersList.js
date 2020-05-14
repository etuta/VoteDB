import React from "react";

export default function VotersList({ voters }) {
  return (
    <div className="voters-list">
      {voters.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
    </div>
  );
}
