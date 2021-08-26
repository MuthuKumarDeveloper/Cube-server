const nameList = {
  users: ["Kivell", "Jones", "Gill"],
};

cube(`RepresentativeTableCsv`, {
  sql: `SELECT * FROM public.representative_table_csv`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {
    RepinfoCsv: {
      relationship: `belongsTo`,
      sql: `${RepresentativeTableCsv}.id = ${RepinfoCsv}.rep_id`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name],
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },

    name: {
      sql: `name`,
      type: `string`,
    },
  },

  segments: {
    ...Object.keys(nameList)
      .map((segment) => ({
        [segment]: {
          sql: `${CUBE}.name = '${nameList[segment][1]}'`,
        },
      }))
      .reduce((a, b) => ({ ...a, ...b })),
  },

  dataSource: `default`,
});
