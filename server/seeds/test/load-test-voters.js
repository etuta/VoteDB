/* eslint-disable func-names */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Voters")
    .del()
    .then(() => {
      return knex("Voters").insert([
        {
          name: "Jim Halpert",
          address: "14 Old Chapel Rd., Middlebury, VT 05753",
          email: "eosorio@middlebury.edu",
          party: "Democrat",
          regstration_status: "Registered",
          age_range: "18-34",
          race: "White",
          socioeconomic_status: "upper"
        }
      ]);
    });
};
