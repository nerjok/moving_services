import React from 'react';

export const StatusBtn = ({status}) => {
  let statusColor, statusStr;

  switch (parseInt(status)) {
    case 2:
      statusColor = 'badge--red';
      statusStr = 'Asap';
      break;
    case 3:
      statusColor = 'badge--blue';
      statusStr = 'Pending';
      break;
    case 4:
      statusColor = 'badge--gray';
      statusStr = 'Near Future';
      break;
    case 0:
      statusColor = 'badge--red';
      statusStr = 'Asap';
      break;
  
    default:
        statusColor = 'badge--green';
        statusStr = 'Active';
      break;
  }

  return <span className={`badge advertisements-row__badge ${statusColor} d-inline`}>{statusStr}</span>
}


export const workTypes = state => {
  switch (state) {
    case 2:
      return 'advertisements-row--green';
    case 3:
      return 'advertisements-row--blue';
    case 4:
      return 'advertisements-row--gray';
    case 1:
      return 'advertisements-row--red';
  
    default:
      return 'advertisements-row--green';
  }
}

export const WorkTypeBtn = status => {
  let timeColor, statusStr;
  switch (status) {
    case 2:
      statusStr = 'Available';
      timeColor = 'badge--green';
      break;
    case 3:
      statusStr = 'Pending';
      timeColor = 'badge--blue';
      break;
    case 4:
      statusStr = 'Near Future';
      timeColor = 'badge--gray';
      break;
    case 1:
      statusStr = "Asap"
      timeColor = 'badge--red';
      break;
  
    default:
      statusStr = 'Available';
      timeColor = 'badge--green';
      break;
  }
  return <span className={`badge advertisements-row__badge ${timeColor} d-inline ml-1`}>{statusStr}</span>
}
