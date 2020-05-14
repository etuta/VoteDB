/* eslint-disable camelcase */
const { Model } = require("objection");

class Voters extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Voters";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "address",

        "email",
        "times_contacted",

        "party",
        "regstration_status",
        "age_range",
        "race",
        "socioeconomic_status",

        "email"
      ],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        address: { type: "text" },
        email: { type: "string" },
        party: { type: "string" },
        registration_status: { type: "string" },
        age_range: { type: "string" },
        race: { type: "string" },
        socioeconomic_status: { type: "string" }
      }
    };
  }
}

module.exports = Voters;
