
export const EDIT_INPUTS = [
  {name: 'email', type: 'text', title: 'Email address', value: 'email', disabled: true},
  {name: 'name', type: 'text', title: 'Name', value: 'name', disabled: false},
  {name: 'description', type: 'textArea', title: 'Description', value: 'description', disabled: false},
  /*
  {name:'status', type: 'select', title: 'Status for job applications', value: 'status', disabled: false, multiple: false,
    options: [
      {title: "Not Available for jobs", value: 1},
      {title: "Available on specified days", value: 2}, 
      {title: "Available in near future", value: 3}, 
      {title: "Part time only", value: 4}
    ],
  }
  */
]


export const SEARCH_JOB_INPUTS = [
  {name:'status', type: 'select', title: 'Status for job applications', value: 'status', disabled: false, multiple: false,
    options: [
      {title: "Not Available for jobs", value: 1},
      {title: "Available on specified days", value: 2}, 
      {title: "Available in near future", value: 3}, 
      {title: "Part time only", value: 4}
    ],
  },
  //{name: 'available', type: 'text', title: 'Accepted time', value: 'available', disabled: false},
  {name: 'sphere', type: 'text', title: 'Working fields', value: 'available', disabled: false},
  //{name: 'city', type: 'text', title: "Region of services", value: 'region', disabled: false},
  {name:'city', type: 'select', title: 'Region of services', value: 'city', disabled: false, multiple: false,
  options: [
    {title: "Vilnius", value: 9},
    {title: "Kaunas", value: 6}, 
    {title: "Klaipeda", value: 1},
    {title: "Siauliai", value: 4},
    {title: "Panevezys", value: 5},
    {title: "Marijampole", value: 7}, 
    {title: "Alytus", value: 8},
    {title: "Telsiai", value: 2}, 
    {title: "Utena", value: 10},
    {title: "Taurage", value: 3}, 
    {title: "Visa Lietuva", value: 11},
    {title: "Kita", value: 12},
  ],
},
  {name:'availableTime', type: 'select', title: 'Time availability', value: 'availableTime', disabled: false, multiple: true,
    options: [
      {title: "Working hours", value: 0},
      {title: "evenings", value: 1}, 
      {title: "weekends and holidays", value: 3}, 
      {title: "nights", value: 4}
    ],
  },
  {name:'scope', type: 'textArea', title: 'Work scope & jobs looking for', value: 'scope', disabled: false},
  {name:'experience', type: 'textArea', title: 'Experience & Education', value: 'experience', disabled: false},
  {name:'prices', type: 'textArea', title: 'Prices & discount info', value: 'prices', disabled: false},
  
]