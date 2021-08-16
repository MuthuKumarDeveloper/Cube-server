cube(`TablematSalesCsv`, {
  sql: `SELECT * FROM public.tablemat_sales_csv`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [date]
    },
    
    unitCost: {
      sql: `unit_cost`,
      type: `sum`
    },
    
    total: {
      sql: `total`,
      type: `sum`
    }
  },
  
  dimensions: {
    date: {
      sql: `date`,
      type: `string`
    },
    
    region: {
      sql: `region`,
      type: `string`
    },
    
    item: {
      sql: `item`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
