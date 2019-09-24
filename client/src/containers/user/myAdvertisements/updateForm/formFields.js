export default [
  {label: 'Title', name: 'title', length: 50},
  {label: 'Description', name: 'description', length: 20},
  {label: 'Skils and experience required', name: 'skills'},
  {label: 'Tools required', name: 'tools'},
  {label: 'Payment information', name: 'payment'},
  {label: 'Date and Time', name: 'time'},
  {label: 'Precise time information', name: 'dateTime'},
  {label: 'Search address', name: 'location'},
  {label: 'WorkType', name: 'workType', options: [
    {title: 'Part Time', color: 'red', value: 1},
    {title: 'Full Time', color: 'green', value: 2},
    {title: 'Freelance', color: 'blue', value: 3},
    {title: 'Flexible Hours', color: 'gray', value: 4},
  ]},
  {label: 'Status', name: 'status', options: [
    {title: 'Available', color: 'green', value: 1},
    {title: 'Asap', color: 'red', value: 2},
    {title: 'Pending', color: 'blue', value: 3},
    {title: 'Near Future', color: 'gray', value: 4},
  ]}
];