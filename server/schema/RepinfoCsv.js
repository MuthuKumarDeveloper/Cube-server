cube(`RepinfoCsv`, {
  sql: `SELECT * FROM public.repinfo_csv`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [date, id]
    },
    
    total: {
      sql: `total`,
      type: `sum`
    },
    
    unitCost: {
      sql: `unit_cost`,
      type: `sum`
    }
  },
  
  dimensions: {
    item: {
      sql: `item`,
      type: `string`
    },
    
    date: {
      sql: `date`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    region: {
      sql: `region`,
      type: `string`
    },

    rep_id: {
      sql: `rep_id`,
      type: `number`,
    },
  },

  segments: {
    regionDetails: {
      sql: `${CUBE}.region = 'north'`,
    },
  },
  
  dataSource: `default`
});
