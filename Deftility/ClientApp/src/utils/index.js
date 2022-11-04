// make sure we don't cut the description in the middle of a word, target space between words instead
export function getShortenedText(text, targetLength = 100) {
  if (text.length < targetLength + 10) {
    return text;
  }

  const cutOffText = text.substring(targetLength);
  const indexOfSpace = cutOffText.indexOf(' ');

  return text.substring(0, targetLength + indexOfSpace) + '...';
}

// calculate time between a date and current moment
export function getTimeAgo(date) {
  const dateInSeconds = Math.floor(date.getTime() / 1000);
  const nowInSeconds = Math.floor(new Date().getTime() / 1000);
  const secondsDifference = nowInSeconds - dateInSeconds;
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthsDifference = Math.floor(daysDifference / 30)
  const yearsDifference = Math.floor(monthsDifference / 12);

  if (secondsDifference < 60) {
    return 'Just Now';
  }

  if (minutesDifference < 60) {
    return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
  }

  if (hoursDifference < 24) {
    return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
  }

  if (daysDifference < 30) {
    return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
  }

  if (monthsDifference < 12) {
    return `${monthsDifference} month${monthsDifference !== 1 ? 's' : ''} ago`;
  }

  if (yearsDifference > 0) {
    return `${yearsDifference} year${yearsDifference !== 1 ? 's' : ''} ago`;
  }
}

// date is within last 24h
export function isNew(date) {
  const dateInSeconds = Math.floor(date.getTime() / 1000);
  const nowInSeconds = Math.floor(new Date().getTime() / 1000);
  const secondsDifference = nowInSeconds - dateInSeconds;
  const hoursDifference = Math.floor(secondsDifference / 3600);

  if (hoursDifference > 23) {
    return false;
  } else {
    return true;
  }
}

export function FormatDate(date) {
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${date.getDate()} ${monthArr[date.getMonth()]} ${date.getFullYear()}`;
}

export function getCookieValue(cookieName) {
  return document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')?.pop() || '';
}
