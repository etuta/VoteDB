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
        "times_contacted",
        "party",
        "regstration_status",
        "age_range",
        "race",
        "socioeconomic_status"
      ],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        address: { type: "text" },
        times_contacted: { type: "integer" },
        party: { type: "string" },
        regstration_status: { type: "boolean" },
        age_range: { type: "string" },
        race: { type: "string" },
        socioeconomic_status: { type: "string" }
      }
    };
  }
}

module.exports = Voters;