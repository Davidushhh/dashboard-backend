const messagesOdaQuery = (limit, skip) => {
  return `SELECT 
  (SELECT COUNT(*) FROM dep_messages WHERE recieverLevel = 'oda') AS totalCount,
  m.id,
  m.senderName,
  m.senderEmail,
  m.recieverName,
  m.title,
  m.text,
  m.isReaded,        
  m.textAnswer,
  m.isArchived,
  m.answeredAt,
  m.createdAt
    FROM dep_messages AS m
    INNER JOIN dep_users AS u ON m.recieverLevel = u.access
    WHERE m.recieverLevel = 'oda' AND u.position = 'council'
    ORDER BY m.createdAt DESC
    LIMIT ${limit} OFFSET ${skip};`;
};

const messagesDistrictQuery = (limit, skip, district) => {
  return `SELECT 
  (SELECT COUNT(*) FROM dep_messages WHERE recieverLevel = 'district' AND recieverDistrict = '${district}') AS totalCount,
  m.id,
  m.senderName,
  m.senderEmail,
  m.recieverName,
  m.title,
  m.text,
  m.isReaded,        
  m.textAnswer,
  m.isArchived,
  m.answeredAt,
  m.createdAt
    FROM dep_messages AS m
    WHERE m.recieverLevel = 'district' AND m.recieverDistrict = '${district}'
    ORDER BY m.createdAt DESC
    LIMIT ${limit} OFFSET ${skip};`;
};

const messagesHromadaQuery = (limit, skip, hromada) => {
  return `SELECT 
  (SELECT COUNT(*) FROM dep_messages WHERE recieverLevel = 'hromada' AND recieverHromada = '${hromada}') AS totalCount,
  m.id,
  m.senderName,
  m.senderEmail,
  m.recieverName,
  m.title,
  m.text,
  m.isReaded,        
  m.textAnswer,
  m.isArchived,
  m.answeredAt,
  m.createdAt
    FROM dep_messages AS m    
    WHERE m.recieverLevel = 'hromada' AND m.recieverHromada = '${hromada}'
    ORDER BY m.createdAt DESC
    LIMIT ${limit} OFFSET ${skip};`;
};

const messagesOdaDeputyQuery = (limit, skip, deputy) => {
  return `SELECT  
  m.id,
  m.senderName,
  m.senderEmail,
  m.recieverName,
  m.recieverLevel,
  m.recieverDistrict,
  m.recieverHromada, 
  m.title,
  m.text,
  m.isReaded,        
  m.textAnswer,
  m.isArchived,
  m.answeredAt,
  m.createdAt,
  (SELECT COUNT(*) FROM dep_messages AS sub_m WHERE sub_m.deputyId = ${id} OR sub_m.councilId = ${id}) AS totalCount
FROM dep_messages AS m
WHERE m.deputyId = ${id} OR m.councilId = ${id}
ORDER BY m.createdAt DESC
LIMIT ${limit} OFFSET ${skip};`;
};

const messagesDistictDeputyQuery = (limit, skip, district, deputy) => {
  return `SELECT
  (SELECT COUNT(recieverName) FROM dep_messages WHERE recieverName = '${deputy}') AS totalCount,  
  m.id,
  m.senderName,
  m.senderEmail,
  m.recieverName,
  m.title,
  m.text,
  m.isReaded,        
  m.textAnswer,
  m.isArchived,
  m.answeredAt,
  m.createdAt
    FROM dep_messages AS m
    INNER JOIN dep_users AS u ON m.recieverLevel = u.access 
    AND m.recieverDistrict = u.district
    AND m.recieverName = u.structureName
    WHERE m.recieverLevel = 'district'
    AND u.position = 'deputy'
    AND m.recieverDistrict = '${district}'
    AND m.recieverName = '${deputy}'
    ORDER BY m.createdAt DESC
    LIMIT ${limit} OFFSET ${skip};`;
};

const messagesHromadaDeputyQuery = (limit, skip, hromada, deputy) => {
  return `SELECT
  (SELECT COUNT(recieverName) FROM dep_messages WHERE recieverName = '${deputy}') AS totalCount,  
  m.id,
  m.senderName,
  m.senderEmail,
  m.recieverName,
  m.title,
  m.text,
  m.isReaded,        
  m.textAnswer,
  m.isArchived,
  m.answeredAt,
  m.createdAt
    FROM dep_messages AS m
    INNER JOIN dep_users AS u ON m.recieverLevel = u.access 
    AND m.recieverHromada = u.hromada
    AND m.recieverName = u.structureName
    WHERE m.recieverLevel = 'hromada'
    AND u.position = 'deputy'
    AND m.recieverHromada = '${hromada}'
    AND m.recieverName = '${deputy}'
    ORDER BY m.createdAt DESC
    LIMIT ${limit} OFFSET ${skip};`;
};

module.exports = {
  messagesOdaQuery,
  messagesDistrictQuery,
  messagesHromadaQuery,
  messagesOdaDeputyQuery,
  messagesDistictDeputyQuery,
  messagesHromadaDeputyQuery,
};
