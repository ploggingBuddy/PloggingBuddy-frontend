export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

export const formatAddress = (address) => {
  if (!address) return "";
  // "00시 00구 00동" 형식으로 변환
  const parts = address.split(" ");
  if (parts.length >= 3) {
    return `${parts[0]} ${parts[1]} ${parts[2]}`;
  }
  return address;
};

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
};
