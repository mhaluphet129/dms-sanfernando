/* 
    { 
        systemID: xxxxx,
        deviceID: xxxx,
    }
*/

let channel = [];
export const getAll = () => channel;
export const get = ({ systemID, deviceID }) => {
  if (systemID) return channel.filter((el) => el.systemID == systemID);
  else return channel.filter((el) => el.deviceID == deviceID);
};
export const pushNewSystem = ({ systemID }) => {
  channel.push({ systemID, deviceID: null });
};
export const pushNewDevice = ({ systemID, deviceID }) => {
  channel.forEach((el) => {
    if (el.systemID == systemID) el.deviceID = deviceID;
  });
};
export const removeSystem = ({ systemID }) => {
  channel = channel.filter((el) => el.systemID != systemID);
};
export const removeDevice = ({ systemID }) => {
  channel.forEach((el) => {
    if (el.systemID == systemID) el.deviceID == null;
  });
};
